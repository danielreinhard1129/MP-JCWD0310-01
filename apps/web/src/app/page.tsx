
import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";


const home = () => {
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
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="mt-5 text-3xl font-bold mb-8">Top Trending Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            <Carousel>
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Image
                      className="mx-auto"
                      width={300}
                      height={300}
                      src="/"
                      alt="event pic"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Manna Essence Treatment
                    </h3>
                    <p className="mb-4">
                      Rejuvenate and hydrate your skin with our luxurious serum,
                      enriched with potent botanical extracts for a visibly
                      radiant complexion and lasting hydration.
                    </p>
                    <p className="text-gray-600">Price: $29.99</p>
                    <Button className="bg-green-700 hover:bg-slate-500 text-white p-3 px-6">
                      Buy
                    </Button>
                  </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Image
                      className="mx-auto"
                      width={300}
                      height={300}
                      src="/"
                      alt="eventpic"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Manna Magic Serum
                    </h3>
                    <p className="mb-4">
                      Experience the enchantment of our Magic Serum, crafted
                      with powerful antioxidants and vitamins for a glowing,
                      youthful complexion.
                    </p>
                    <p className="text-gray-600">Price: $17.99</p>
                    <Button className="bg-green-700 hover:bg-slate-500 text-white p-3 px-6">
                      Buy
                    </Button>
                  </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Image
                      className="mx-auto"
                      width={300}
                      height={300}
                      src="/"
                      alt="event pic"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Manna Anti-Acne Serum
                    </h3>
                    <p className="mb-4">
                      Combat blemishes and breakouts with our Anti-Acne Serum,
                      formulated with gentle yet effective ingredients to
                      clarify and soothe troubled skin
                    </p>
                    <p className="text-gray-600">Price: $15.00</p>
                    <Button className="bg-green-700 hover:bg-slate-500 text-white p-3 px-6">
                      Buy
                    </Button>
                  </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Image
                      className="mx-auto"
                      width={300}
                      height={300}
                      src="/"
                      alt="eventpic"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Manna Anti-Aging Serum
                    </h3>
                    <p className="mb-4">
                      Turn back the hands of time with our Anti-Aging Serum,
                      infused with potent peptides and nourishing botanicals to
                      diminish fine lines and wrinkles.
                    </p>
                    <p className="text-gray-600">Price: $17.99</p>
                    <Button className="bg-green-700 hover:bg-slate-500 text-white p-3 px-6">
                      Buy
                    </Button>
                  </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Image
                      className="mx-auto"
                      width={300}
                      height={300}
                      src="/"
                      alt="event pic"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Manna White Serum
                    </h3>
                    <p className="mb-4">
                      Illuminate your complexion with our White Serum, expertly
                      formulated to brighten, tone, and achieve a radiant,
                      luminous glow effortlessly.
                    </p>
                    <p className="text-gray-600">Price: $12.99</p>
                    <Button className="bg-green-700 hover:bg-slate-500 text-white p-3 px-6">
                      Buy
                    </Button>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

      <h1 className="mt-5 text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 w-screen p-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded shadow-md">
            <div>
              <Image
                className="mx-auto"
                width={300}
                height={150}
                src="/"
                alt=""
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>
            <button className="bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded hover:bg-blue-600">Buy Ticket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default home;
