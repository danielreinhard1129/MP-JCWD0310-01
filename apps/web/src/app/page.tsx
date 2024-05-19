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
import { FC, useState } from "react";

const Home: FC = () => {
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
  const freeEvents =
    allEvents?.filter((event) => event.category === "Concert") || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-marine-100 px-4">
      <section className="mx-4 mt-2 md:mx-10">
        <div className="mb-6 grid h-56 w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-1">
          <Carousel>
            <CarouselContent className="mx-2 w-full">
              <CarouselItem className="md:basis  rounded-lg md:mx-auto">
                <div className="relative top-2 flex h-[220px] items-center justify-center rounded-lg bg-[url('/img/concert.avif')] bg-cover md:bg-contain shadow-lg md:h-[250px] md:w-full">
                  <h1 className="text-lg text-white md:text-5xl"> CONCERT</h1>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis  md:mx-auto">
                <div className="relative top-2 flex h-[220px] items-center justify-center rounded-lg bg-[url('/img/exhibite.jpg')] bg-cover md:bg-auto shadow-lg md:h-[250px]">
                  <h1 className="text-lg text-white md:text-5xl">
                    {" "}
                    EXHIBITION
                  </h1>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis  md:mx-auto">
                <div className="relative top-2 flex h-[220px] items-center justify-center rounded-lg bg-[url('/img/fitness.jpg')] bg-cover shadow-lg md:h-[250px]">
                  <h1 className="text-lg text-white md:text-5xl">
                    {" "}
                    FITNESS
                  </h1>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis  md:mx-auto">
                <div className="relative top-2 flex h-[220px] items-center justify-center rounded-lg bg-[url('/img/festival2.jpg')] bg-cover shadow-lg md:h-[250px]">
                  <h1 className="text-lg text-white md:text-5xl">
                    {" "}
                    FESTIVAL
                  </h1>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis  md:mx-auto">
                <div className="relative top-2 flex h-[220px] items-center justify-center rounded-lg bg-[url('/img/workshop.jpg')] bg-cover shadow-lg md:h-[250px]">
                  <h1 className="text-lg text-white md:text-5xl">
                    {" "}
                    WORKSHOP
                  </h1>
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
        <div className="items-center">
          <Carousel>
            <CarouselContent className="mt-4 grid w-full grid-cols-1 md:grid-cols-5">
              {freeEvents.map((event, index) => (
                <CarouselItem key={index}>
                  <EventCard
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

export default Home;
