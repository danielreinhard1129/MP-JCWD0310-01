import { registerService } from '@/services/auth/register.service';
import { getUserService } from '@/services/user/get-user.service';
import { updateUserService } from '@/services/user/update-user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateUserService(req.body, Number(req.params.id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUserService(Number(req.params.id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
}
