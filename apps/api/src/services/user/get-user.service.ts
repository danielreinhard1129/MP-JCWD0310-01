import prisma from '@/prisma';

export const getUserService = async (userId: number) => {
  try {
    const user = await prisma.userDetail.findFirst({
      where: { userId },
      include: { user: { include: { Point: true } } },
    });
    return { message: 'Get user by userId success', data: user };
  } catch (error) {
    throw error;
  }
};
