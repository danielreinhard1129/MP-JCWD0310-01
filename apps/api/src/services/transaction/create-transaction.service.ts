import prisma from '@/prisma';
import { ITransactionArgs } from '@/types/transaction.type';
import {scheduleJob } from "node-schedule"

export const createTransactionService = async (body: ITransactionArgs) => {
  try {
    const {
      eventId,
      userId,
      eventVoucherId,
      isPointUsed,
      qty,
      ticketTypeId,
      userVoucherId,
    } = body;
    const event = await prisma.event.findFirst({ where: { id: eventId } });
    const user = await prisma.user.findFirst({ where: { id: userId } });
    let eventVoucher = null;
    let userVoucher = null;
    const ticketType = await prisma.ticketType.findFirst({
      where: { id: ticketTypeId },
    });

    if (!event) {
      throw new Error('Event not found');
    }
    if (!user) {
      throw new Error('User not found');
    }

    if (eventVoucherId) {
      eventVoucher = await prisma.eventVoucher.findFirst({
        where: { eventId: eventId, voucherId: eventVoucherId },
        include: { voucher: true },
      });
      if (!eventVoucher) {
        throw new Error('Voucher not found');
      }
    }
    if (userVoucherId) {
      userVoucher = await prisma.userVoucher.findFirst({
        where: { userId: userId, voucherId: userVoucherId },
        include: { voucher: true },
      });
      if (!userVoucher) {
        throw new Error('Voucher not found');
      }
    }

    if (!ticketType) {
      throw new Error('Ticket invalid');
    }
    let userPoint = null;
    if (isPointUsed) {
      userPoint = await prisma.point.findFirst({ where: { userId } });
    }

    if (!userPoint) {
      throw new Error('Point invalid');
    }
    const tempTotal = ticketType?.price * qty - userPoint?.totalPoints;
    const rewardValue =
      tempTotal * (eventVoucher?.voucher.discountValue! / 100);
    const discountValue =
      tempTotal * (userVoucher?.voucher.discountValue! / 100);

    const transaction = await prisma.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          eventId,
          userId,
          total: tempTotal - rewardValue - discountValue,
        },
      });

      const newTransactionDetail = await tx.transactionDetail.create({
        data: {
          qty,
          transactionId: newTransaction.id,
          ticketTypeId,
          eventVoucherId,
          userVoucherId,
          pointId: userPoint.id,
        },
      });
      await tx.userVoucher.update({
        where: { id: userVoucher?.id },
        data: { isUsed: true },
      });
      await tx.voucher.update({
        where: { id: eventVoucher?.voucherId },
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
