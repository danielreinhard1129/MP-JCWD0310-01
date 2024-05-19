import prisma from '@/prisma';

export const getEventService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: { organizer: true, Discount: true },
    });
    
    if (!event) {
      throw new Error('the event is not found');
    }

    return event
  } catch (error) {
    throw error;
  }
};
