import { IUser } from "./user.type";

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