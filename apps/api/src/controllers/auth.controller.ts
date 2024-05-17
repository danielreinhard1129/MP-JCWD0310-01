import { forgotPasswordService } from '@/services/auth/forgot-password.service';
import { keepLoginService } from '@/services/auth/keep-login.service';
import { loginService } from '@/services/auth/login.service';
import { registerOrganizerService } from '@/services/auth/register-organizer.service';
// import { registerOrganizerService } from '@/services/auth/register-organizer.service';
import { registerService } from '@/services/auth/register.service';
import { resetPasswordService } from '@/services/auth/reset-password.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async registerOrganizerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerOrganizerService(req.body);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async keepLoginController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.body.user.id;
      const result = await keepLoginService(Number(id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }


  async forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await forgotPasswordService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async resetPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.body.user.id);
      const password = req.body.password;

      const result = await resetPasswordService(userId, password);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
