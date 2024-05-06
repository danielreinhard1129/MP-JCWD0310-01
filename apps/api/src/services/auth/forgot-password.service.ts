import { JWT_SECRET_KEY, NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

interface IForgotPassArgs extends Pick<User, 'email'> {}

export const forgotPasswordService = async (body: IForgotPassArgs) => {
  try {
    const { email } = body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error('Email not found/registered');
    }

    const token = sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: '30m',
    });

    const link = NEXT_BASE_URL + `/reset-password?token=${token}`;

    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Reset your password',
      html: `<a href="${link}" target="_blank">Reset your password here</a>`,
    });

    return { message: 'email reset password has been sent' };
  } catch (error) {
    throw error;
  }
  
};
