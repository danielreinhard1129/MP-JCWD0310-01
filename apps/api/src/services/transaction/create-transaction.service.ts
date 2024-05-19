import prisma from '@/prisma';
import { ITransactionArgs, Status } from '@/types/transaction.type';
import {
  Discount,
  Point,
  Reward,
  Transaction,
  UserDiscount,
  UserReward,
} from '@prisma/client';
import { scheduleJob } from 'node-schedule';

interface IUserDiscount extends UserDiscount {
  discount: Discount;
}
interface IUserReward extends UserReward {
  reward: Reward;
}

export const createTransactionService = async (body: ITransactionArgs) => {
  try {
    const { eventId, userId, userDiscountId, isPointUsed, qty, userRewardId } =
      body;
    const event = await prisma.event.findFirst({ where: { id: eventId } });
    const user = await prisma.user.findFirst({ where: { id: userId } });
    let userDiscount: IUserDiscount | undefined | null = undefined;
    let userReward: IUserReward | undefined | null = undefined;
    let userPoint: Point | undefined | null = undefined;

    if (!event) {
      throw new Error('Event not found');
    }
    if (!user) {
      throw new Error('User not found');
    }

    if (userDiscountId) {
      userDiscount = await prisma.userDiscount.findFirst({
        where: { userId: userId, discountId: userDiscountId },
        include: { discount: true },
      });
      if (!userDiscount) {
        throw new Error('Voucher not found');
      }
    }
    if (userRewardId) {
      userReward = await prisma.userReward.findFirst({
        where: { userId: userId, rewardId: userRewardId },
        include: { reward: true },
      });
      if (!userReward) {
        throw new Error('Voucher not found');
      }
    }

    if (isPointUsed) {
      userPoint = await prisma.point.findFirst({ where: { userId } });
      if (!userPoint) {
        throw new Error('Point invalid');
      }
    }

    const tempTotal = event.price * Number(qty) - (userPoint?.totalPoints || 0);
    const tempTotalAfterPotongan =
      tempTotal - userDiscount?.discount.discountValue! ||
      0 - userReward?.reward.discountValue! ||
      0;
    let newTransaction: Transaction | undefined | null = null;
    const transaction = await prisma.$transaction(async (tx) => {
      newTransaction = await tx.transaction.create({
        data: {
          eventId,
          userId: Number(userId),
          total: Number(tempTotalAfterPotongan),
        },
      });

      const newTransactionDetail = await tx.transactionDetail.create({
        data: {
          qty,
          transactionId: newTransaction.id,
          userDiscountId,
          userRewardId,
          pointId: userPoint?.id,
        },
      });
      if (userRewardId) {
        await tx.userReward.update({
          where: { id: userReward?.id },
          data: { isUsed: true },
        });
      }

      if (userDiscountId) {
        await tx.discount.update({
          where: { id: userDiscount?.discountId },
          data: { limit: { decrement: 1 } },
        });
      }

      if (isPointUsed) {
        await tx.point.update({
          where: { userId: user.id },
          data: { totalPoints: 0 },
        });
      }
      const shcedule = new Date(Date.now() + 5 * 1000);
      scheduleJob('run every ', shcedule, async () => {
        const transaction = await prisma.transaction.findFirst({
          where: {
            id: newTransaction?.id,
            status:Status.PENDING,
          },
        });
        if (!transaction) {
          await prisma.transaction.update({
            where: { id: newTransaction?.id },
            data: { status: 'CANCELLED' },
          });
          await prisma.point.update({
            where: { userId: user.id },
            data: { totalPoints: userPoint?.totalPoints },
          });
        }

        console.log('cron executed');
        return { data: transaction };
      });
    });
    return { message: 'create transaction success', data: newTransaction };
  } catch (error) {
    throw error;
  }
};
