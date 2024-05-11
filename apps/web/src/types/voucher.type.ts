import { IEvent } from "./event.type";
import { ITransactionDetail } from "./transaction.type";
import { IUser } from "./user.type";

export interface IVoucher {
  id: number;
  title: string;
  discountValue: number;
  voucherType: string;
  createdAt: Date;
  expiredDate: Date;
  limit?: number | null;
  used?: number | null;
  UserVoucher: IUserVoucher[];
  EventVoucher: IEventVoucher[];
}

export interface IUserVoucher {
  id: number;
  voucherId: number;
  userId: number;
  user: IUser;
  voucher: IVoucher;
  TransactionDetail?: ITransactionDetail;
}

export interface IEventVoucher {
  id: number;
  voucherId: number;
  eventId: number;
  voucher: IVoucher;
  event: IEvent;
  TransactionDetail?: ITransactionDetail;
}

export interface IPoint {
  id: number;
  totalPoints: number;
  updatedAt: Date;
  expiredDate: Date;
  userId: number;
  user: IUser;
  TransactionDetail?: ITransactionDetail;
}
