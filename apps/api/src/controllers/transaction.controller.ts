import { getTransactionsByOrganizerService } from '@/services/transaction/get-transactions-by-organizer';
import { Status } from '@/types/transaction.type';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
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
            sortBy: (req.query.sortBy as string) || 'createdAt',
            sortOrder: (req.query.sortOrder as string) || 'desc',
            search: req.query.search as string ||"",
            status: req.query.status as Status,
          };
          const result = await getTransactionsByOrganizerService(query);
    
          return res.status(200).send(result);
        } catch (error) {
          next(error);
        }
      }
    }
