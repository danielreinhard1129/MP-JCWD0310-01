import prisma from '@/prisma';
import { ITransactionArgs } from '@/types/transaction.type';
import {scheduleJob } from "node-schedule"

export const createTransactionService = async (body: ITransactionArgs) => {
  try {
    const {
      eventId,
      userId,
      userDiscountId,
      isPointUsed,
      qty,
      ticketTypeId,
      userRewardId,
    } = body;
    const event = await prisma.event.findFirst({ where: { id: eventId } });
    const user = await prisma.user.findFirst({ where: { id: userId } });
    let userDiscount = null;
    let userReward = null;
    

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

    
    let userPoint = null;
    if (isPointUsed) {
      userPoint = await prisma.point.findFirst({ where: { userId } });
    }

    if (!userPoint) {
      throw new Error('Point invalid');
    }
    const tempTotal = event.price * qty - userPoint?.totalPoints;
    const tempTotalAfterPotongan =
      tempTotal - (userDiscount?.discount.discountValue! ) - (userReward?.reward.discountValue! );


    const transaction = await prisma.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          eventId,
          userId,
          total: tempTotalAfterPotongan
        },
      });

      const newTransactionDetail = await tx.transactionDetail.create({
        data: {
          qty,
          transactionId: newTransaction.id,
          ticketTypeId,
          userDiscountId,
          userRewardId,
          pointId: userPoint.id,
        },
      });
      await tx.userReward.update({
        where: { id: userReward?.id },
        data: { isUsed: true },
      });
      await tx.discount.update({
        where: { id: userDiscount?.discountId },
        data: { limit: { decrement: 1 } },
      });
      await tx.point.update({
        where: { userId: user.id },
        data: { totalPoints: 0 },
      });
      const shcedule = new Date(Date.now() + 5 * 1000);
      scheduleJob('run every ', shcedule, async () => {
        const transaction = await prisma.transaction.findFirst({
          where: {
            id: newTransaction.id,
            paymentProof: newTransaction.paymentProof,
          },
        });
        if (!transaction) {
          await prisma.transaction.update({
            where: { id: newTransaction.id },
            data: { status: 'CANCELLED' },
          });
          await prisma.point.update({
            where: { userId: user.id},
            data: { totalPoints: userPoint.totalPoints },
          });
        }

        console.log('cron executed');
        return { data: transaction };
      });
    });
    return {message:"create transaction success"}
  } catch (error) {
    throw error;
  }
};
