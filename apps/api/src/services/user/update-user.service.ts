import prisma from '@/prisma';
import { UserDetail } from '@prisma/client';

interface IUpdateUser extends Omit<UserDetail, 'id' | 'referral'> {}

export const updateUserService = async (
  body: IUpdateUser,
  paramsId: number,
) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { id: paramsId },
    });

    if (!existingUser) {
      throw new Error('User not found.');
    }
    
    await prisma.userDetail.update({
      where: { userId: paramsId },
      data: { ...body },
    });

    return { message: 'Edit profile success' };
  } catch (error) {
    throw error;
  }
};
