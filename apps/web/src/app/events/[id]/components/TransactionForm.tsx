"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "../../../../components/ui/button";
import { Switch } from "../../../../components/ui/switch";

interface TransactionFormProps {
  availableSeat: number;
  discount: number;
  point: number;
  price: number;
  rewardValue: number;
}

const TransactionForm: FC<TransactionFormProps> = ({
  availableSeat,
  discount,
  point,
  price,
  rewardValue
}) => {
  const router = useRouter();
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isPointUsed, setIsPointUsed] = useState(false);

  useEffect(() => {
    
    const ticketPrice = price; // Harga per tiket
    const totalPrice = ticketCount * ticketPrice;
    
    let totalDiscount = 0;
    let updatedPoint = point;
    if (isPointUsed) {
      totalDiscount += point;
      updatedPoint = 0;
    }
    const total = Math.max(0, totalPrice - totalDiscount); // Pastikan total tidak negatif
    setTotalPayment(total);
    
    const totalPayment = total;
  }, [ticketCount, point, price, isPointUsed]);
  
  // Fungsi untuk menangani pengurangan jumlah tiket
  const resetTicketCount = () => {
    setTicketCount(0);
  };

  return (
    <div className=" w-full rounded-lg bg-blue-600 text-white shadow-md lg:w-[350px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full lg:w-[350px]">
            Get Ticket
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Summary</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col">
            <div className="mb-4 flex justify-between gap-4">
              <label htmlFor="availableSeat" className="text-left text-sm">
                Price:
              </label>
              <span className="">{price}</span>
            </div>
            <div className="mb-4 flex justify-between gap-4">
              <label htmlFor="availableSeat" className="text-left text-sm">
                Available Seat:
              </label>
              <span className="">{availableSeat}</span>
            </div>
            <div className="mb-4 flex justify-between gap-4">
              <label htmlFor="ticketCount">Ticket Count:</label>
              <div className="flex justify-center gap-1">
                <input
                  type="number"
                  id="ticketCount"
                  name="ticketCount"
                  value={ticketCount}
                  className="w-14 text-center font-medium"
                  onChange={(e) => setTicketCount(parseInt(e.target.value))}
                />
                <button
                  className="w-4 text-center"
                  type="button"
                  onClick={resetTicketCount}
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
            <div className="mb-4 flex justify-between gap-4">
              <label htmlFor="fullPrice">Full Price :</label>
              <span>IDR. {ticketCount * price}</span> {/* Harga per tiket */}
            </div>
            <div className="mb-4 flex flex-col gap-3">
              <label htmlFor="reward" className="mb-2 block">
                Voucher:
              </label>
              <select
                name="rewardpoind"
                id="rewardpoind"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-marine-200 focus:outline-none"
              >
                <option value="">Pilih Voucher</option>
                <option value="voucher">{discount}</option>
                <option value="reward2">5000</option>
                <option value="reward3">8000</option>
              </select>

              <label htmlFor="reward" className="mb-2 block">
                Reward:
              </label>
              <select
                name="rewardpoind"
                id="rewardpoind"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-marine-200 focus:outline-none"
              >
                <option value="">Pilih Reward</option>
                <option value="reward1">reward</option>
                <option value="reward2">50000</option>
                <option value="reward3">8000</option>
              </select>
            </div>

            <div className="mb-4 flex justify-between gap-4">
              <label htmlFor="totalPayment" className="text-xl font-bold">
                Total:
              </label>
              <span className="text-2xl font-semibold">
                {isPointUsed
                  ? `IDR. ${totalPayment - point}`
                  : `IDR. ${totalPayment}`}
              </span>
            </div>
            <div className="mb-4 flex justify-between gap-4">
              <span>point : {isPointUsed ? 0 : point}</span>
              <Switch
                checked={isPointUsed}
                onCheckedChange={() => setIsPointUsed(!isPointUsed)}
              />
            </div>
            <DialogFooter className="mt-4 sm:justify-start">
              <Button type="submit" onClick={() => router.push("/transaction")}>
                Checkout
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionForm;
