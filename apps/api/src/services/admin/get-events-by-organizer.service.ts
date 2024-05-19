
import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetEventsQuery extends PaginationQueryParams {
  id: number;
  search: string;
}

export const getEventsByOrganizerService = async (
  query: GetEventsQuery,

) => {
  try {
    const { page, search, sortBy, sortOrder, take,id } = query;

    const whereClause: Prisma.EventWhereInput = {
      title: { contains: search },
      organizerId: Number(id),
    };

    const events = await prisma.event.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { organizer: true },
    });

    const count = await prisma.event.count({ where: whereClause });

    return {
      data: events,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};