export interface ITransactionArgs {
    userId: number
    eventId: number
    ticketTypeId:number
    qty: number
    isPointUsed:boolean 
    eventVoucherId:number
    userVoucherId: number


}
export enum Status {
    OPENED = 'OPENED',
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED',
  }