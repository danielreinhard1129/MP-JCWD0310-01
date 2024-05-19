import prisma from '@/prisma';
import { IEventAgr } from '@/types/event.type';
import { Event, Discount } from '@prisma/client';

interface createEventBody
  extends Omit<Event, 'deletedAt' | 'createdAt' | 'updatedAt' | 'thumbnail'> {}

export const createEventService = async (
  body: IEventAgr,
  file: Express.Multer.File,
) => {
  try {
    const { title, organizerId, description, limit, startDate, endDate, price, discountName, discountValue, discountLimit, discountExpires } = body;

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

    const createdEvent = await prisma.event.create({
      data: {
        title: title,
        address: body.address,
        category: body.category,
        city: body.city,
        description: description,
        thumbnail: `/images/${file.filename}`,
        organizerId: Number(organizerId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: Number(price),
        limit: Number(limit),
      },
    });

    let createdDiscount = null;

    if (discountName && discountValue && discountLimit && discountExpires) {
      createdDiscount = await prisma.discount.create({
        data: {
          name: discountName,
          value: Number(discountValue),
          limit: Number(discountLimit),
          expires: new Date(discountExpires),
          eventId: createdEvent.id,
        },
      });
    }

    return {
      event: createdEvent,
      discount: createdDiscount,
    };
  } catch (error) {
    throw error;
    
  }
};
