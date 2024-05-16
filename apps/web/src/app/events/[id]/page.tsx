"use client";

import { Separator } from "@/components/ui/separator";
import useGetEvent from "@/hooks/api/admin/useGetEvent";
import { appConfig } from "@/utils/config";
import { format } from "date-fns";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EventDetail = ({ params }: { params: { id: string } }) => {
  const { event, isLoading } = useGetEvent(Number(params.id));
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        {/* <SkeletonBlogDetail/>; */}
      </div>
    );
  }

  if (!event) {
    return notFound();
  }
  return (
    <main className="container mx-auto px-4">
      <section className="mb-4 mt-5 lg:mx-12">
        <div className="mb-4 gap-3 space-y-1.5 lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="relative p-2 lg:col-span-3">
            <div className="h-[250px]  lg:h-[400px]">
              <Image
                fill
                src={`${appConfig.baseURL}/assets${event.thumbnail}`}
                alt="thumbnail image"
                className="rounded-xl bg-slate-200 object-cover"
              />
            </div>
          </div>

          <div className="relative lg:col-span-2">
            <div className="flex w-full flex-col gap-8 rounded-lg border p-3 shadow-md md:p-4">
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-bold">{event.title}</h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <Badge className="p-bold-20 rounded-full bg-marine-300 px-5 py-2 text-marine-700">
                      {event.price === 0 ? "Free" : `IDR.${event.price}`}
                    </Badge>
                    <Badge className="p-medium-16 rounded-full bg-slate-200 px-4 py-2.5 text-slate-600">
                      {event.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 md:gap-3">
                  <div className="p-medium-16 lg:p-regular-20 flex flex-wrap gap-4 md:flex-col">
                    <div className="flex items-center">
                      <IoCalendarOutline
                        className="mr-2 text-slate-600"
                        size={17}
                      />
                      <p className="text-base font-light">
                        {format(new Date(event.startDate), "dd MMMM yyyy")} -{" "}
                        {format(new Date(event.endDate), "dd MMMM yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <IoMdTime className="mr-2  text-slate-600" size={18} />
                      <p className="text-base font-light">
                        {format(new Date(event.startDate), "hh:mm")} -{" "}
                        {format(new Date(event.endDate), "hh:mm")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-regular-20 flex items-center gap-3">
                  <div className="flex justify-start">
                    <FiMapPin className="mr-2  text-slate-600" size={26} />
                    <p className="mb:5 text-base font-light md:mb-8">
                      {event.address} - {event.city}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex flex-row">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="p-medium-18 ml-5 mt-2 text-sm sm:mt-0 ">
                      Organized by{" "}
                    </p>
                    <span className="ml-5 font-semibold text-marine-500">
                      {event.organizer.fullName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DESCRIPTION AND */}
      <section className="mb-4 mt-5 lg:mx-12">
        <div className="mb-4 space-y-1.5 lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="relative h-[400px] lg:col-span-3">
            <div className="flex flex-col gap-3">
              <p className="p-bold-20 text-grey-600 text-md p-6">
                Description:
              </p>
              <p className="lg:p-regular-18 p-6">{event.description}</p>
              {/* <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</p> */}
            </div>
          </div>
          {/* BUy Button */}
          <div className="lg:col-span-2">
            <div className="flex justify-center p-4">
              <button
                onClick={() => router.push("/transaction")}
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white shadow-md lg:w-[350px]"
              >
                Get a Ticket
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetail;
