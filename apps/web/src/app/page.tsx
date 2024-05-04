import Image from "next/image";
import React from "react";

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
