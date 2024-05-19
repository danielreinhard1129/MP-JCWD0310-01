import { IEvent} from "./event.type";
import { IUser } from "./user.type";
// import { IEventVoucher, IPoint, IUserVoucher } from "./voucher.type";

export interface TRX {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  total: number;
  userId: number;
  eventId: number;
  paymentProof?: string;
  event: IEvent;
  user: IUser;
}

export enum IStatusTransaction {
  OPENED = 'OPENED',
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}
export interface ITransaction {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  total: number;
  userId: number;
  eventId: number;
  user: IUser;
  event: Event;
  TransactionDetail?: ITransactionDetail;
}

export interface ITransactionDetail {
  id: number;
  createdAt: Date;
  qty: number;
  transactionId: number;
  ticketTypeId: number;
  eventVoucherId?: number | null;
  userVoucherId?: number | null;
  pointId?: number | null;
  transaction: ITransaction;
  // ticketType: ITicketType;
  // eventVoucher?: IEventVoucher | null;
  // userVoucher?: IUserVoucher | null;
  // point?: IPoint | null;
}
