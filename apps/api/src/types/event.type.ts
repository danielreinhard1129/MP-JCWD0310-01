export interface IEventAgr {
    userId?: number, 
    title: string;
    category: string;
    place: string;
    city: string;
    province: string;
    address: string;
    description: string;
    thumbnail: string;
    startDate: Date;
    endDate: Date;
    time: string;
    ticket: string;
    ticketName: string;
    ticketPrice: number;
    ticketCategory: string;
    availableSeats: number;
    ticketStart: Date;
    ticketExpires: Date;
    voucherTitle?: string;
    voucherLimit?: number;
    voucherDiscount?: number;
    voucherExpires?: Date;
  }