import prisma from '@/prisma';
import { Transaction } from '@prisma/client';
import { join } from 'path';
import fs from 'fs';
import { Status } from '@/types/transaction.type';

const defaultDir = '../../../public/txProof';

export const updateTransactionService = async (
  id: number,
  body: Partial<Transaction>,
  file: Express.Multer.File,
) => {
  try {
    const tx = await prisma.transaction.findFirst({
      where: { id },
    });

    if (!tx) {
      throw new Error('Transaction not found');
    }

    if (file) {
      body.paymentProof = `/txProof/${file.filename}`;
      const imagePath = join(
        __dirname,
        '../../../public' + tx.paymentProof,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return await prisma.transaction.update({
      where: { id },
      data: { ...body, status: Status.PENDING},
    });
  } catch (error) {
    const imagePath = join(__dirname, defaultDir + file?.filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    throw error;
  }
};