import { IEvent } from "./event.type";
import { IUser } from "./user.type";

export interface IReview {
    id: number;
    rating: string;
    reviewText?: string | null;
    userId: number;
    eventId: number;
    user: IUser;
    event: IEvent;
  }