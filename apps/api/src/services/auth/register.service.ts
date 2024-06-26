import { hashPassword } from '@/lib/bcrypt';
import { generateReferral } from '@/lib/referralGenerator';
import prisma from '@/prisma';
import { Reward, User } from '@prisma/client';

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

    let newReferralDiscount: Reward;

    prisma.$transaction(async (tx) => {
      newUser = await prisma.user.create({
        data: { email, fullName, password: hashedPass },
      });
      const referralDiscount = await prisma.reward.findFirst({
        where: { title: 'Referral Discount' },
      });

      if (!referralDiscount) {
        newReferralDiscount = await prisma.reward.create({
          data: {
            discountValue: 10000,
            title: 'Referral Discount',
            expiredDate: expiredYear,

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
        const userPoint = await prisma.point.findFirst({
          where: { userId: existingReferral.userId },
        });

        if (new Date() < userPoint?.expiredDate!) {
          await prisma.point.update({
            where: { userId: existingReferral.userId },
            data: {
              totalPoints: { increment: 10000 },
              expiredDate: newExpiredDate,
            },
          });
        } else {
          await prisma.point.update({
            where: { userId: existingReferral.userId },
            data: { totalPoints: 10000, expiredDate: newExpiredDate },
          });
        }
      }
      if (existingReferral) {
        if (referralDiscount) {
          await prisma.userReward.create({
            data: { userId: newUser.id, rewardId: referralDiscount.id },
          });
          await prisma.reward.update({
            where: { id: referralDiscount.id },
            data: { expiredDate: expiredYear },
          });
        } else {
          await prisma.userReward.create({
            data: { userId: newUser.id, rewardId: newReferralDiscount.id },
          });
          await prisma.reward.update({
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
