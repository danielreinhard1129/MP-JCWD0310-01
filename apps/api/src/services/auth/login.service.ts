import { JWT_SECRET_KEY } from '@/config';
import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

interface ILoginArgs extends Pick<User, 'email' | 'password'> {}

export const loginService = async (body: ILoginArgs) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: '2h',
    });

    return { message: 'Login successful!', data: user, token };
  } catch (error) {
    throw error;
  }
};
