import { IReview } from "./review.type";
import { ITransaction } from "./transaction.type";
import { IUser } from "./user.type";
import { Discount } from "./voucher.type";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  address: string;
  city: string;
  limit: number;
  booked?: number;
  thumbnail: string;
  category: string;
  price: number;
  organizerId: number;
  organizer: IUser;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  Review   : IReview
  Transaction: ITransaction
  Discount : Discount[]
}

export interface IFormEvent {
  organizerId?: number;
  title: string;
  thumbnail: File[];
  category: string;
  address: string;
  city: string;
  description: string;
  startDate: string;
  endDate: string;
  price: string;
  limit: string;
  discountName: string;
  discountLimit: string;
  discountValue: string;
  discountExpires: string;
}
