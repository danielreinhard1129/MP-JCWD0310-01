import { hashPassword } from '@/lib/bcrypt';
import { generateReferral } from '@/lib/referralGenerator';
import prisma from '@/prisma';
import { User, Voucher } from '@prisma/client';

interface IRegisterArgs extends Pick<User, 'email' | 'fullName' | 'password'> {
  referral: string;
}

export const registerService = async (body: IRegisterArgs) => {
  try {
    const { email, password, referral, fullName } = body;

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPass = await hashPassword(password);

    const existingReferral = await prisma.userDetail.findFirst({
      where: { referral },
    });

    const date = new Date();
    const expiredDate = date.setMonth(date.getMonth() + 3);

    const newExpiredDate = new Date(
      new Date().setMonth(new Date().getMonth() + 3),
    );

    const expiredYear = new Date(
      new Date().setMonth(new Date().getMonth() + 12),
    );

    let newUser = null;

    let newReferralDiscount: Voucher;

    prisma.$transaction(async (tx) => {
      newUser = await prisma.user.create({
        data: { email, fullName, password: hashedPass },
      });
      const referralDiscount = await prisma.voucher.findFirst({
        where: { title: 'Referral Discount' },
      });

      if (!referralDiscount) {
        newReferralDiscount = await prisma.voucher.create({
          data: {
            discountValue: 10,
            title: 'Referral Discount',
            expiredDate: expiredYear,
            voucherType: 'REWARDS',
          },
        });
      }

      if (newUser) {
        await prisma.userDetail.create({
          data: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            referral: generateReferral(),
            userId: newUser.id,
          },
        });
      }
      if (newUser) {
        await prisma.point.create({
          data: {
            userId: newUser.id,
            totalPoints: 0,
            expiredDate: new Date(expiredDate),
          },
        });
      }

      if (existingReferral) {
        await prisma.point.update({
          where: { userId: existingReferral.userId },
          data: {
            totalPoints: { increment: 10000 },
            expiredDate: newExpiredDate,
          },
        });
      }
      if (existingReferral) {
        if (referralDiscount) {
          await prisma.userVoucher.create({
            data: { userId: newUser.id, voucherId: referralDiscount.id },
          });
          await prisma.voucher.update({
            where: { id: referralDiscount.id },
            data: { expiredDate: expiredYear },
          });
        } else {
          await prisma.userVoucher.create({
            data: { userId: newUser.id, voucherId: newReferralDiscount.id },
          });
          await prisma.voucher.update({
            where: { id: newReferralDiscount.id },
            data: { expiredDate: expiredYear },
          });
        }
      }
    });

    return { message: 'Register succesful!', data: newUser };
  } catch (error) {
    throw error;
  }
};
