import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Status } from '@/types/transaction.type';
import { Prisma } from '@prisma/client';

interface GetTransactionsQuery extends PaginationQueryParams {
  id: number;
  search: string;
  status: Status;
}

export const getTransactionsByOrganizerService = async (
  query: GetTransactionsQuery,
) => {
  try {
    const { page, search, sortBy, sortOrder, take, id, status } = query;

    const whereClause: Prisma.TransactionWhereInput = {
      status: status,
      event: { organizer: { id: Number(id) } },
    };

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      //   where: whereClause,
      // include: { user: true },
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { event: { include: { organizer: true } }, user: true },
    });

    const count = await prisma.transaction.count({ where: whereClause });

    return {
      data: transactions,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
