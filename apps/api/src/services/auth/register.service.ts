import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';

interface IRegisterArgs extends Pick<User, 'email' | 'username' | 'password'> {}

export const registerService = async (body: IRegisterArgs) => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPass = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { ...body, password: hashedPass },
    });

    return { message: 'Register succesful!', data: newUser };
  } catch (error) {
    throw error;
  }
};
