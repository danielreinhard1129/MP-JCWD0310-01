import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

export const resetPasswordService = async (
  userId: number,
  password: string,
) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    
    if (!user) {
      throw new Error('account not found');
    }

    const hashedPass = await hashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPass },
    });

    return { message: 'Reset password success' };
  } catch (error) {
    throw error;
  }
};
