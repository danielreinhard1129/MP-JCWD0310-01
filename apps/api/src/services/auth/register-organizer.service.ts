import { hashPassword } from '@/lib/bcrypt';
import { generateReferral } from '@/lib/referralGenerator';
import prisma from '@/prisma';
import { User, Voucher } from '@prisma/client';

interface IRegisterOrganizerArgs
  extends Pick<User, 'email' | 'fullName' | 'password' | 'role'> {}

export const registerOrganizerService = async (
  body: IRegisterOrganizerArgs,
) => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPass = await hashPassword(password);

    let newUser = null;

    prisma.$transaction(async (tx) => {
      newUser = await prisma.user.create({
        data: { ...body, password: hashedPass, role: 'ORGANIZER' },
      });
      if (newUser) {
        await prisma.userDetail.create({
          data: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            referral: '',
            userId: newUser.id,
          },
        });
      }
    });

    return { message: 'Register succesful!', data: newUser };
  } catch (error) {
    throw error;
  }
};
