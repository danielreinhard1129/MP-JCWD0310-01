export interface IEventAgr {
  organizerId?: number;
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
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  discountName?: string;
  discountLimit?: number;
  discountValue?: number;
  discountExpires?: Date;
}
