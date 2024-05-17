"use client";
import { Button } from "@/components/ui/button";
import { Calendar, Contact, Ticket } from "lucide-react";

import Unaothorized from "@/components/Unaothorized";
import AuthGuardCustomer from "@/hoc/AuthGuardCustomer";
import useGetUser from "@/hooks/api/users/useGetUser";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TransactionHistory = ({ params }: { params: { id: string } }) => {
  const { id } = useAppSelector((state) => state.user);
  const { user, isLoading: isLoadingGetUser } = useGetUser(Number(params.id));

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  if (isLoadingGetUser) {
    return (
      <h1 className="container flex h-screen justify-center px-4 pt-24 text-4xl font-extrabold">
        Loading...
      </h1>
    );
  }

  if (id !== user?.userId) {
    return <Unaothorized />;
  }

  return (
    <section className="px-6 py-10 md:px-36 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Account Information</h1>
      </div>
      <hr className="my-6 w-full" />

      {/* profile account */}

      <div className="grid grid-cols-5 min-h-screen">
        {/* ========SIDEBAR========= */}
        <div className="min-w-full border-r-2">
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
            <Button
              variant="ghost"
              className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
              onClick={() => router.push(`/profile/${id}/edit`)}
            >
              <Contact className="mr-2 h-6 w-6" />
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
              onClick={() => router.push(`/profile/${id}/transaction-history`)}
            >
              <Calendar className="mr-2 h-6 w-6" />
              Transaction history
            </Button>
            <Button
              variant="ghost"
              className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
              onClick={() => router.push(`/profile/${id}/vouchers`)}
            >
              <Ticket className="mr-2 h-6 w-6" />
              Points & Vouchers
            </Button>
          </div>
        </div>

        {/* =============MAIN========== */}
        <div className="col-span-4 ml-16 ">
          <div className="flex flex-col justify-center gap-4 p-2">
            <div className=" text-lg font-semibold">Transactions History</div>
            <div className="flex md:flex-row md:gap-8">aasdadssa</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthGuardCustomer(TransactionHistory);
