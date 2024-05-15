import { IReview } from "./review.type";
import { ITransaction, ITransactionDetail } from "./transaction.type";
import { IUser } from "./user.type";
import { IEventVoucher } from "./voucher.type";

export interface IEvent {
  id: number;
  title: string;
  category: string;
  description: string;
  startDate: Date;
  endDate: Date;
  limit: number;
  booked: number;
  locationId: number;
  organizerId: number;
  categoryId: number;
  address: string;
  city: string;
  price: number;
  location: ILocation;
  thumbnail: string;
  organizer: IUser;
  TicketType: ITicketType[];
  EventVoucher: IEventVoucher[];
  Review?: IReview | null;
  Transaction?: ITransaction | null;

  user: IUser
}

export interface IFormEvent {
  title: string;
  category: string;
  address: string;
  city: string;
  description: string;
  thumbnail: File[];
  organizerId?: number;
  startDate: string;
  endDate: string;
  price: string;
  limit: string;
}

export interface ICategory {
  id: number;
  title: string;
  Event: IEvent[];
}

export interface ILocation {
  id: number;
  name: string;
  city: string;
  province: string;
  address: string;
  Event: IEvent[];
}

export interface ITicketType {
  id: number;
  title: string;
  price: number;
  limit: number;
  booked: number;
  catagory: string;
  expiredDate?: Date | null;
  eventId: number;
  event: IEvent;
  TransactionDetail?: ITransactionDetail;
}
