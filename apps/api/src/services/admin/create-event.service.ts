import prisma from '@/prisma';
import { Event } from '@prisma/client';


interface createEventBody
  extends Omit<Event, 'deletedAt' | 'createdAt' | 'updatedAt' | 'thumbnail'> {}

export const createEventService = async (
  body: createEventBody,
  file: Express.Multer.File,
) => {
  try {
    const { title, organizerId, limit, price, startDate, endDate } = body;

    const existingTitle = await prisma.event.findFirst({
      where: { title },
    });

    if (existingTitle) {
      throw new Error('title is already used');
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(organizerId) },
    });

    if (!user) {
      throw new Error('user is not found');
    }

    return await prisma.event.create({
      data: {
        ...body,
        thumbnail: `/images/${file.filename}`,
        organizerId: Number(organizerId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: Number(price),
        limit: Number(limit),
      },
    });
  } catch (error) {
    throw error;
  }
};
