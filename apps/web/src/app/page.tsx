"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";

const home = () => {
  const { id, role } = useAppSelector((state) => state.user);
  console.log(id, role);

  const events = [
    {
      id: 1,
      title: "Event 1",
      description:
        "Description of Event 1 :Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi maxime possimus unde impedit suscipit.",
    },
    {
      id: 2,
      title: "Event 2",
      description:
        "Description of Event 2 :Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi maxime possimus unde impedit suscipit.",
    },
    {
      id: 3,
      title: "Event 3",
      description:
        "Description of Event 3 :Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi maxime possimus unde impedit suscipit.",
    },
    {
      id: 4,
      title: "Event 4",
      description:
        "Description of Event 4 :Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi maxime possimus unde impedit suscipit.",
    },
    {
      id: 5,
      title: "Event 5",
      description:
        "Description of Event 5 :Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi maxime possimus unde impedit suscipit.",
    },
    {
      id: 6,
      title: "Event 6",
      description:
        "Description of Event 6 :Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi maxime possimus unde impedit suscipit.",
    },
    // Add more events as needed
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 mt-5 text-3xl font-bold">Top Trending Events</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
                <h3 className="mb-2 text-xl font-bold">
                  Manna Essence Treatment
                </h3>
                <p className="mb-4">
                  Rejuvenate and hydrate your skin with our luxurious serum,
                  enriched with potent botanical extracts for a visibly radiant
                  complexion and lasting hydration.
                </p>
                <p className="text-gray-600">Price: $29.99</p>
                <Button className="bg-green-700 p-3 px-6 text-white hover:bg-slate-500">
                  Buy
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="eventpic"
                />
                <h3 className="mb-2 text-xl font-bold">Manna Magic Serum</h3>
                <p className="mb-4">
                  Experience the enchantment of our Magic Serum, crafted with
                  powerful antioxidants and vitamins for a glowing, youthful
                  complexion.
                </p>
                <p className="text-gray-600">Price: $17.99</p>
                <Button className="bg-green-700 p-3 px-6 text-white hover:bg-slate-500">
                  Buy
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
                <h3 className="mb-2 text-xl font-bold">
                  Manna Anti-Acne Serum
                </h3>
                <p className="mb-4">
                  Combat blemishes and breakouts with our Anti-Acne Serum,
                  formulated with gentle yet effective ingredients to clarify
                  and soothe troubled skin
                </p>
                <p className="text-gray-600">Price: $15.00</p>
                <Button className="bg-green-700 p-3 px-6 text-white hover:bg-slate-500">
                  Buy
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="eventpic"
                />
                <h3 className="mb-2 text-xl font-bold">
                  Manna Anti-Aging Serum
                </h3>
                <p className="mb-4">
                  Turn back the hands of time with our Anti-Aging Serum, infused
                  with potent peptides and nourishing botanicals to diminish
                  fine lines and wrinkles.
                </p>
                <p className="text-gray-600">Price: $17.99</p>
                <Button className="bg-green-700 p-3 px-6 text-white hover:bg-slate-500">
                  Buy
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  src="/"
                  alt="event pic"
                />
                <h3 className="mb-2 text-xl font-bold">Manna White Serum</h3>
                <p className="mb-4">
                  Illuminate your complexion with our White Serum, expertly
                  formulated to brighten, tone, and achieve a radiant, luminous
                  glow effortlessly.
                </p>
                <p className="text-gray-600">Price: $12.99</p>
                <Button className="bg-green-700 p-3 px-6 text-white hover:bg-slate-500">
                  Buy
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <h1 className="mb-8 mt-5 text-3xl font-bold">Upcoming Events</h1>
      <div className="grid w-screen grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="rounded bg-white p-4 shadow-md">
            <div>
              <Image
                className="mx-auto"
                width={300}
                height={150}
                src="/"
                alt=""
              />
            </div>
            <h2 className="mb-2 text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>
            <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
              Buy Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default home;
