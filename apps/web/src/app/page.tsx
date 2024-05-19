"use client";

import EventCard from "@/components/EventCard";
import Pagination from "@/components/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGetEvents from "@/hooks/api/admin/useGetEvents";
import { useAppSelector } from "@/redux/hooks";
import { appConfig } from "@/utils/config";
import Image from "next/image";
import { useState } from "react";


const home = () => {
  const { id } = useAppSelector((state) => state.user);
  const [page, setPage] = useState<number>(1);
  const { data: allEvents } = useGetEvents({ page: 1, take: 9 });
  const { data: paginatedEvents, meta } = useGetEvents({
    page,
    take: 5,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  console.log(id);

  // Filter for free events
  const freeEvents = allEvents?.filter((event) => event.price === 0) || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-marine-100 px-4">
      <h1 className="mb-4 mt-4 text-2xl font-bold md:mb-8 md:text-3xl"></h1>
      <section className="mx-4 md:mx-10">
        <div className="mb-6 grid h-56 w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-1">
          <Carousel>
            <CarouselContent className="mx-4 w-full">
              <CarouselItem className="md:basis pl-4  md:mx-auto">
                <div className="rounded-lg bg-white p-4 shadow-lg md:p-6 ">
                  <Image
                    className="mx-auto rounded-lg object-cover object-center shadow-md "
                    fill
                    src="/img/concert.jpg"
                    alt="event pic"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-2/3">
                <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                  <Image
                    className="mx-auto"
                    width={220}
                    height={200}
                    src="/img/exibition.jpg"
                    alt="event pic"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-2/3">
                <div className="rounded-lg bg-transparent p-4 shadow-lg md:p-6">
                  <Image
                    className="mx-auto rounded-lg object-cover object-center shadow-md"
                    width={220}
                    height={200}
                    src="/img/festival.jpg"
                    alt="event pic"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-2/3">
                <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                  <Image
                    className="mx-auto"
                    width={220}
                    height={200}
                    src="/"
                    alt="event pic"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-2/3">
                <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
                  <Image
                    className="mx-auto"
                    width={220}
                    height={200}
                    src="/"
                    alt="event pic"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="mx-4 md:mx-8">
        <h1 className="mb-4 mt-5 text-left text-lg font-semibold md:mb-8 md:text-xl">
          Favorite Events
        </h1>
        <div>
          <Carousel>
            <CarouselContent className="mt-4 grid w-full grid-cols-1 md:grid-cols-5">
              {freeEvents.map((event, index) => (
                <CarouselItem>
                  <EventCard
                    key={index}
                    eventId={event.id}
                    title={event.title}
                    category={event.category}
                    price={event.price}
                    startDate={event.startDate}
                    organizer={event.organizer.fullName}
                    imageUrl={appConfig.baseURL + `/assets${event.thumbnail}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section className="mx-4 md:mx-8">
        <h1 className="mb-4 mt-5 text-left text-lg font-semibold md:mb-8 md:text-xl">
          Upcoming Events
        </h1>
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-5">
          {paginatedEvents.map((event, index) => (
            <EventCard
              key={index}
              eventId={event.id}
              title={event.title}
              category={event.category}
              price={event.price}
              startDate={event.startDate}
              organizer={event.organizer.fullName}
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
      </section>
    </main>
  );
};

export default home;
