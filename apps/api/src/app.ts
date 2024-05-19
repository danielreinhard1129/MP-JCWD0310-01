import cors from 'cors';
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  static as static_,
  urlencoded
} from 'express';
import { join } from 'path';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { EventRouter } from './routers/event.router';
import { SampleRouter } from './routers/sample.router';
import { TransactionRouter } from './routers/transaction.router';
import { UserRouter } from './routers/user.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/assets', static_(join(__dirname, '../public')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const authRouter = new AuthRouter();
    const userRouter = new UserRouter();
    const eventRouter = new EventRouter();
    const transactionRouter = new TransactionRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/events', eventRouter.getRouter());
    this.app.use('/api/transactions', transactionRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
