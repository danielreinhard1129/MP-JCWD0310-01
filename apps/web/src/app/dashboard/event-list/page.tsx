"use client";

import EventCard from "@/components/EventCard";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";
import useGetEventsByOrganizer from "@/hooks/api/admin/useGetEventsByOrganizer";
import { useAppSelector } from "@/redux/hooks";
import { appConfig } from "@/utils/config";
import { Calendar, Home as HomeIcon, TicketCheck } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const EventList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const { data: events, meta } = useGetEventsByOrganizer({
    id,
    page,
    take: 8,
  });
  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  

  return (
    <main className=" min-h-full min-w-full md:m-0">
      {/* =============== DESKTOP ============== */}
      <section className="">
        <div className="my-0 flex gap-4 rounded-lg bg-transparent bg-zinc-100 shadow-inner">
          <div className="sticky top-0 h-screen w-[250px] bg-marine-400 shadow-sm">
            <div className="flex h-full flex-col items-center gap-2 py-20 ">
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
                onClick={()=>router.push("/dashboard/transactions")}
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
              <div className="grid-row-2 grid h-[85%] min-w-full grid-cols-4 gap-4 px-2">
                {events.map((event, idx) => {
                  return (
                    <Card
                      key={event.id}
                      className="h-[490px] cursor-pointer hover:shadow-xl"
                      onClick={() => router.push(`/events/${event.id}`)}
                    >
                      <CardHeader>
                        <div className="relative h-[150px] overflow-hidden">
                          <Image
                            src=""
                            alt="Thumbnail"
                            className="rounded-t-md object-cover"
                            fill
                          />
                        </div>
                        <CardTitle className="max-h-12 min-h-12">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="max-h-12 min-h-12">
                          {event.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <Badge className="my-3 rounded-sm bg-marine-200 text-sm text-slate-700">
                            {event.category}
                          </Badge>
                          <p className="mb-2 text-sm font-light">
                            {format(event.startDate, "dd MMMM yyyy")}
                          </p>
                          <p className="text-md mb-5 font-semibold">
                            {event.price === 0 ? "Free" : `Rp ${event.price}`}
                          </p>
                          <Separator />
                          <p className="mt-4 ">{event.organizer.fullName}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Pagination
                total={meta?.total || 0}
                take={meta?.take || 0}
                onChangePage={handleChangePaginate}
              />
              <Separator className="my-8 h-0.5 bg-white" />
            </div>
          </div>
        </div>
      </section>
      {/* ============ END DESKTOP ============= */}
    </main>
  );
};

export default AuthGuardOrganizer(EventList);
