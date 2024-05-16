import { AuthController } from '@/controllers/auth.controller';
import { validateForgotPassword } from '@/middlewares/forgot-password.validator';
import { validateLoginInput } from '@/middlewares/login.validator';
import { validateRegisterInput } from '@/middlewares/register.validator';
import { validateResetPassword } from '@/middlewares/reset-password.validator';
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
      // validateRegisterInput,
      this.authController.registerController,
    );
    this.router.post(
      '/register-organizer',
      
      this.authController.registerOrganizerController,
    );
    this.router.post(
      '/login',
      validateLoginInput,
      this.authController.loginController,
    );
    this.router.post(
      '/forgot-password',
      validateForgotPassword,
      this.authController.forgotPasswordController,
    );
    this.router.patch(
      '/reset-password',
      validateResetPassword,
      verifyToken,
      this.authController.resetPasswordController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
