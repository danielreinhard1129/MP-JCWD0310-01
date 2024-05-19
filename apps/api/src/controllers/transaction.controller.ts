import { acceptTransactionService } from '@/services/transaction/acceptTransaction';
import { createTransactionService } from '@/services/transaction/create-transaction.service';
import { getTransactionsByOrganizerService } from '@/services/transaction/get-transactions-by-organizer';
import { getTransactionsService } from '@/services/transaction/get-transactions-user.service';
import { rejectTransactionService } from '@/services/transaction/rejectTransaction';
import { Status } from '@/types/transaction.type';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async createTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionsByOrganizerController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'updatedAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
        status: req.query.status as Status,
      };
      const result = await getTransactionsByOrganizerService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'updatedAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
        status: req.query.status as Status,
      };
      const result = await getTransactionsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async acceptTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await acceptTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async rejectTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await rejectTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
