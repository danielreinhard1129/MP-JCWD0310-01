"use client";

import EventCard from "@/components/EventCard";
import Pagination from "@/components/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useGetEvents from "@/hooks/api/admin/useGetEvents";
import { appConfig } from "@/utils/config";
import Image from "next/image";
import { useState } from "react";

const home = () => {
  const [page, setPage] = useState<number>(1);
  const { data: events, meta } = useGetEvents({
    page,
    take: 5,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="mb-4 mt-5 text-2xl font-bold md:mb-8 md:text-3xl">
        Top Trending Events
      </h1>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-1">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-2/3">
              <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-2/3">
              <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-2/3">
              <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-2/3">
              <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-2/3">
              <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-6 text-lg font-bold md:mt-10">Upcoming Events</div>
      <div className="mt-4 flex w-full flex-col gap-4 md:w-1/2">
        {events.map((event, index) => (
          <EventCard
            key={index}
            eventId={event.id}
            title={event.title}
            category={event.category}
            price={event.price}
            startDate={event.startDate}
            imageUrl={appConfig.baseURL + `/assets${event.thumbnail}`}
          />
        ))}
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:w-1/2">
        {events.map((event, index) => (
          <EventCard
            key={index}
            eventId={event.id}
            title={event.title}
            category={event.category}
            price={event.price}
            startDate={event.startDate}
            imageUrl={appConfig.baseURL + `/assets${event.thumbnail}`}
          />
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </main>
  );
};

export default home;
