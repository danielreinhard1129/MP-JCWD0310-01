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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Pagination from "@/components/pagination";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";
import useGetTransactionsByOrganizer from "@/hooks/api/transactions/useGetTransactionsByOrganizer";
import useGetTransactionsPending from "@/hooks/api/transactions/useGetTransactionsPending";
import { useAppSelector } from "@/redux/hooks";
import { IStatusTransaction } from "@/types/transaction.type";
import { Calendar, Home as HomeIcon, TicketCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminApprove from "./components/AdminApprove";
import useAcceptTransaction from "@/hooks/api/transactions/useAcceptTransaction";

const Transactions = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [pagePending, setPagePending] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);

  const { data: transactions, meta } = useGetTransactionsByOrganizer({
    id,
    page,
    take: 5,
  });

  const { data: pendingTx, meta: pendingMeta } = useGetTransactionsPending({
    id,
    page: pagePending,
    take: 5,
    status: IStatusTransaction.PENDING,
  });


  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  const handleChangePaginatePending = ({ selected }: { selected: number }) => {
    setPagePending(selected + 1);
  };

  return (
    <main className=" min-w-full md:m-0">
      {/* =============== DESKTOP ============== */}
      <section className="">
        <div className="my-0 flex gap-4 rounded-lg bg-transparent bg-zinc-100 shadow-inner">
          <div className="sticky top-0 h-screen w-[250px] bg-marine-400 shadow-sm">
            <div className="flex h-full flex-col items-center gap-2 py-20">
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="h-16 w-full justify-start rounded-none pl-8 text-violet-100 hover:bg-zinc-200 hover:shadow-inner"
              >
                <HomeIcon className="mr-2 h-6 w-6" />
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard/transactions")}
                className="h-16 w-full justify-start rounded-none pl-8 text-violet-100 hover:bg-zinc-200 hover:shadow-inner"
              >
                <TicketCheck className="mr-2 h-6 w-6" />
                Transactions
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard/event-list")}
                className="h-16 w-full justify-start rounded-none pl-8 text-violet-100 hover:bg-zinc-200 hover:shadow-inner"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Events
              </Button>
            </div>
          </div>
          <div className="h-[1200px] w-5/6">
            <div className="mt-8 h-full bg-transparent px-4">
              <div className="mb-4 flex justify-between px-2">
                <h1 className="text-4xl font-bold">Organizer Dashboard</h1>
              </div>
              <div className="mt-2 rounded-lg bg-white p-2 shadow-lg">
                <Tabs defaultValue="onGoing" className=" ">
                  <TabsList className=" mx-2 my-2 flex h-full w-1/3 justify-start gap-2 p-0 shadow-inner">
                    <TabsTrigger
                      value="onGoing"
                      className="h-12 w-1/2 rounded-r-none shadow-none"
                    >
                      Waiting for Approval
                    </TabsTrigger>
                    <TabsTrigger
                      value="all"
                      className="h-12 w-1/2 rounded-l-none shadow-none"
                    >
                      Transactions List
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="onGoing">
                    <div className="flex justify-end">
                      <Pagination
                        total={pendingMeta?.total || 0}
                        take={pendingMeta?.take || 0}
                        onChangePage={handleChangePaginatePending}
                      />
                    </div>
                    <Table>
                      <TableCaption>
                        A list of pending transactions.{" "}
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="">Amount</TableHead>
                          <TableHead>Event Title</TableHead>
                          <TableHead>Buyer</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingTx.map((tx, idx) => {
                          return (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">
                                {/* INV001 */}
                                {tx.id}
                              </TableCell>
                              <TableCell>{tx.status}</TableCell>
                              <TableCell>{tx.total}</TableCell>
                              <TableCell className="">
                                {tx.event.title}
                              </TableCell>
                              <TableCell>{tx.user.fullName}</TableCell>
                              <TableCell>
                                <AdminApprove
                                  status={tx.status}
                                  paymentProof={tx.paymentProof || ""}
                                  id={tx.id}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="all">
                    <div className="flex justify-end">
                      <Pagination
                        total={meta?.total || 0}
                        take={meta?.take || 0}
                        onChangePage={handleChangePaginate}
                      />
                    </div>
                    <Table>
                      <TableCaption>
                        A list of all your transactions.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="">Amount</TableHead>
                          <TableHead>Event Title</TableHead>
                          <TableHead>Buyer</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((tx, idx) => {
                          return (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">
                                {/* INV001 */}
                                {tx.id}
                              </TableCell>
                              <TableCell>{tx.status}</TableCell>
                              <TableCell>{tx.total}</TableCell>
                              <TableCell className="">
                                {tx.event.title}
                              </TableCell>
                              <TableCell>{tx.user.fullName}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============ END DESKTOP ============= */}
    </main>
  );
};

export default AuthGuardOrganizer(Transactions);
