import { AuthController } from '@/controllers/auth.controller';
import { validateLoginInput } from '@/middlewares/login.validator';
import { validateRegisterInput } from '@/middlewares/register.validator';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/keep-login',
      verifyToken,
      this.authController.keepLoginController,
    );
    this.router.post(
      '/register',
      validateRegisterInput,
      this.authController.registerController,
    );
    this.router.post(
      '/login',
      validateLoginInput,
      this.authController.loginController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
