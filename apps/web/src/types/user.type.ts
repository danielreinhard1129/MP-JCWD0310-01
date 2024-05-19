import { IReview } from "./review.type";
import { ITransaction } from "./transaction.type";
import { Point, UserDiscount, UserReward } from "./voucher.type";


export interface IUser {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  role: string;
  isVerified: boolean;
  UserDetail?: IUserDetail;
  Event: Event[];
  UserDiscount: UserDiscount[];
  Point? : Point
  Review: IReview[];
  Transaction: ITransaction[];
  UserReward: UserReward[]
}

export interface IUserDetail {
  id: number;
  phoneNumber?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  referral?: string | null;
  userId: number;
  gender: string;
  user: IUser;
}






