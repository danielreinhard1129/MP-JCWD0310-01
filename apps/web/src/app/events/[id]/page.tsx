"use client";

import CustomBreadcrumb from "@/components/Breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useGetEvent from "@/hooks/api/admin/useGetEvent";
import useGetUser from "@/hooks/api/users/useGetUser";
import { appConfig } from "@/utils/config";
import { format } from "date-fns";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { FiMapPin } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import TransactionForm from "./components/TransactionForm";
import { useAppSelector } from "@/redux/hooks";

const EventDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useAppSelector((state) => state.user);
  const { event, isLoading } = useGetEvent(Number(params.id));
  const { user } = useGetUser(Number(id));

  console.log(id);
  console.log(user?.user.Point?.totalPoints);
  console.log(event?.Discount[0]?.discountValue);
  console.log(user?.user.UserReward);

  const totalRewardValue =
    user?.user.UserReward?.reduce(
      (total, reward) => total + reward.reward.discountValue,
      0,
    ) ?? 0;
  // console.log(totalRewardValue);

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

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const eventDetailBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Category", href: `/category/${event.category}` },
    { label: "Category", href: `/category/${event.category}` },
    { label: `....`, href: `${event.id}` },
  ];

  const today = new Date();
  const endDate = new Date(event.endDate);
  const isEventEnded = today > endDate;

  return (
    <main className="container mx-auto bg-marine-50 px-4">
      <CustomBreadcrumb paths={eventDetailBreadcrumb} />
      <section className="mb-4 mt-2 lg:mx-12">
        <div className="mb-4 gap-3 space-y-1.5 lg:grid lg:grid-cols-6 lg:gap-8">
          <div className="relative p-2 lg:col-span-4">
            <div className="h-[250px]  lg:h-[400px]">
              <Image
                fill
                src={`${appConfig.baseURL}/assets${event.thumbnail}`}
                alt="thumbnail image"
                className="rounded-xl bg-slate-200 object-cover md:p-1.5"
              />
            </div>
          </div>

          <div className="relative bg-slate-50 lg:col-span-2">
            <div className="flex w-full flex-col gap-8 rounded-lg border p-3 shadow-md md:p-4">
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-bold">{event.title}</h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <Badge
                      className={`p-bold-20 rounded-xl px-5 text-lg ${isEventEnded ? "text-red-600" : "bg-marine-300 text-marine-700"}`}
                    >
                      {isEventEnded
                        ? "Event Ended"
                        : event.price === 0
                          ? "Free"
                          : `IDR.${event.price}`}
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
                    <FiMapPin className="mr-2  text-slate-600" size={17} />
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
      <section className="mb-4 mt-5 lg:mx-12 lg:h-[700px]">
        <div className=" mb-4 flex flex-col space-y-1.5 lg:grid lg:grid-cols-6 lg:gap-8">
          <div className="h-[400px] md:relative lg:col-span-4">
            <div className=" flex flex-col gap-3">
              <p className="p-bold-20 text-grey-600 text-md pl-6">
                Description:
              </p>
              <div className="">
                <p
                  className="lg:p-regular-18 block p-6 lg:hidden"
                  onClick={toggleDescription}
                >
                  {isExpanded
                    ? event.description
                    : event.description.slice(0, 135)}
                  {event.description.length > 3 && !isExpanded && "..."}
                </p>
                <p className="lg:p-regular-18 hidden p-6 md:block">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
          {/* BUy Button */}
          <div className=" lg:col-span-2">
            <div className="rounded-lg border p-4 shadow-md">
              <div className="flex justify-center  ">
                <button className=" w-full rounded-lg py-2 text-white lg:w-[350px]">
                  <TransactionForm
                    discount={event.Discount[0].discountValue}
                    rewardValue={
                      user?.user.UserReward[0].reward.discountValue ?? 0
                    }
                    availableSeat={event.limit}
                    price={event.price}
                    point={user?.user.Point?.totalPoints ?? 0}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetail;
