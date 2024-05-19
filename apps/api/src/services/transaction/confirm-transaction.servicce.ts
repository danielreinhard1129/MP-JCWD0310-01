import { GMAIL_EMAIL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { Status } from '@/types/transaction.type';
import { Transaction } from '@prisma/client';

interface ConfirmTrx extends Partial<Transaction> {
  email: string;
}

export const confirmTransactionService = async (body: ConfirmTrx) => {
  let updateStatus = null;
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id: body.id },
      include: { user: true, event: true },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if ((body.status === 'CANCELLED')) {
      updateStatus = await prisma.transaction.update({
        where: { id: Number(body.id) },
        data: {
          status: Status.CANCELLED,
        },
      });
      await transporter.sendMail({
        from: 'Admin',
        to: transaction.user.email,
        subject: `Your Payment on: ${transaction.event.title}`,
        html: `<div><h4>Your payment is CANCELLED.</h4><p>Reason: Manually rejected by admin.</p></div>`,
      });
    } else if ((body.status === 'COMPLETE')) {
      updateStatus = await prisma.transaction.update({
        where: { id: Number(body.id) },
        data: {
          status: Status.COMPLETE,
        },
      });
      await transporter.sendMail({
        from: 'Admin',
        to: transaction.user.email,
        subject: `Your Payment on: ${transaction.event.title}`,
        html: `<div><h4>Your payment is COMPLETE.</h4></div>`,
      });
    }

    return { message: 'Status has been updated', data: updateStatus?.status };
  } catch (error) {
    throw error;
  }
};
