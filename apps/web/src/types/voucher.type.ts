import { IEvent } from "./event.type";
import { ITransactionDetail } from "./transaction.type";
import { IUser } from "./user.type";

export interface Reward {
  id: number;
  title: string;
  value: number;
  createdAt: Date;
  expiredDate: Date;
  UserReward: UserReward[];
}

export interface UserReward {
  id: number;
  rewardId: number;
  userId: number;
  isUsed: boolean;
  user: IUser;
  reward: Reward;
  TransactionDetail: ITransactionDetail;
}

export interface Discount {
  id: number;
  name: string;
  value: number;
  createdAt: Date;
  expires: Date;
  limit: number;
  used: number;
  eventId: number;
  event: Event;
  UserDiscount: UserDiscount[];
}

export interface UserDiscount {
  id: number;
  discountId: number;
  userId: number;
  isUsed: boolean;
  discount: Discount;
  user: IUser;
  TransactionDetail?: ITransactionDetail;
}

export interface Point {
  id: number;
  totalPoints: number;
  updatedAt: Date;
  expiredDate: Date;
  userId: number;
  user: IUser;
  TransactionDetail?: ITransactionDetail;
}