export interface ITransactionArgs {
    userId: number
    eventId: number
    ticketTypeId:number
    qty: number
    isPointUsed:boolean 
    userDiscountId:number
    userRewardId: number


}
export enum Status {
    OPENED = 'OPENED',
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED',
  }