"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Contact } from "lucide-react";

import Unaothorized from "@/components/Unaothorized";
import Pagination from "@/components/pagination";
import AuthGuardCustomer from "@/hoc/AuthGuardCustomer";
import useGetTransactions from "@/hooks/api/transactions/useGetTransactions";
import useGetUser from "@/hooks/api/users/useGetUser";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TransactionHistory = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const { user, isLoading: isLoadingGetUser } = useGetUser(Number(params.id));
  const { data: transactions, meta } = useGetTransactions({
    id,
    page,
    take: 8,
    sortBy:"status",
    sortOrder:"asc"
  });

  console.log(transactions);

  const router = useRouter();

  if (isLoadingGetUser) {
    return (
      <h1 className="container flex h-screen justify-center px-4 pt-24 text-4xl font-extrabold">
        Loading...
      </h1>
    );
  }
  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  if (id !== user?.userId) {
    return <Unaothorized />;
  }

  return (
    // <section className="min-h-screen px-6 py-10 md:px-36">
    //   <div className="flex justify-between">
    //     <h1 className="text-4xl font-bold">Account Information</h1>
    //   </div>
    //   <hr className="my-6 w-full" />

    //   {/* profile account */}

    //   <div className="grid min-h-screen grid-cols-5">
    //     {/* ========SIDEBAR========= */}
    //     <div className="min-w-full border-r-2">
    //       <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
    //         <Button
    //           variant="ghost"
    //           className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
    //           onClick={() => router.push(`/profile/${id}/edit`)}
    //         >
    //           <Contact className="mr-2 h-6 w-6" />
    //           Edit Profile
    //         </Button>
    //         <Button
    //           variant="ghost"
    //           className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
    //           onClick={() => router.push(`/profile/${id}/transaction-history`)}
    //         >
    //           <Calendar className="mr-2 h-6 w-6" />
    //           Transaction history
    //         </Button>
    //       </div>
    //     </div>

    //     {/* =============MAIN========== */}
    //     <div className="col-span-4 ml-16 ">
    //       <div className="flex flex-col justify-center gap-4 p-2">
    //         <div className=" text-lg font-semibold">Transactions History</div>
    //         <div className="flex md:flex-col md:gap-8">
    //           <Table>
    //             <TableCaption>A list of all your transactions.</TableCaption>
    //             <TableHeader>
    //               <TableRow>
    //                 <TableHead className="w-[100px]">ID</TableHead>
    //                 <TableHead>Status</TableHead>
    //                 <TableHead className="">Amount</TableHead>
    //                 <TableHead>Event Title</TableHead>
    //                 <TableHead>Buyer</TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {transactions.map((tx, idx) => {
    //                 return (
    //                   <TableRow key={idx}>
    //                     <TableCell className="font-medium">
    //                       {/* INV001 */}
    //                       {tx.id}
    //                     </TableCell>
    //                     <TableCell>{tx.status}</TableCell>
    //                     <TableCell>{tx.total}</TableCell>
    //                     <TableCell className="">{tx.event.title}</TableCell>
    //                     <TableCell>{tx.user.fullName}</TableCell>
    //                   </TableRow>
    //                 );
    //               })}
    //             </TableBody>
    //           </Table>
    //           <div className="flex justify-end">
    //             <Pagination
    //               total={meta?.total || 0}
    //               take={meta?.take || 0}
    //               onChangePage={handleChangePaginate}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="min-h-screen px-4 py-6 md:px-36  md:py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="mb-4 text-2xl font-bold md:mb-0 md:text-4xl">
          Account Information
        </h1>
      </div>
      <hr className="my-6 w-full" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="border-r-2 md:col-span-1">
          <div className="flex flex-col justify-center gap-2 px-4">
            <Button
              variant="ghost"
              className="h-12 w-full justify-start text-marine-800 hover:bg-zinc-200 md:h-16"
              onClick={() => router.push(`/profile/${id}/edit`)}
            >
              <Contact className="mr-2 h-6 w-6" />
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              className="h-12 w-full justify-start text-marine-800 hover:bg-zinc-200 md:h-16"
              onClick={() => router.push(`/profile/${id}/transaction-history`)}
            >
              <Calendar className="mr-2 h-6 w-6" />
              Transaction history
            </Button>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="flex flex-col justify-center gap-4 p-2">
            <div className="text-lg font-semibold">Transactions History</div>
            <div className="flex flex-col gap-4">
              <Table>
                <TableCaption>A list of all your transactions.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Event Title</TableHead>
                    <TableHead>Buyer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, idx) => {
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell>{tx.status}</TableCell>
                        <TableCell>{tx.total}</TableCell>
                        <TableCell>{tx.event.title}</TableCell>
                        <TableCell>{tx.user.fullName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex justify-end">
                <Pagination
                  total={meta?.total || 0}
                  take={meta?.take || 0}
                  onChangePage={handleChangePaginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthGuardCustomer(TransactionHistory);
