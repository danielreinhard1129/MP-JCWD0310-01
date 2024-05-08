import { UserController } from '@/controllers/user.controller';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.userController.getUserController);
    this.router.patch('/:id', this.userController.updateUserController);
  }

  getRouter(): Router {
    return this.router;
  }
}
