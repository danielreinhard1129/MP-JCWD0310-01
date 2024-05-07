"use client";
import { useState } from "react";

const CreateEventPage = () => {
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [ticketType, setTicketType] = useState("free");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kirim data ke backend atau lakukan operasi lainnya
    console.log({
      eventName,
      category,
      price,
      image,
      date,
      time,
      location,
      description,
      availableSeats,
      ticketType,
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <div>
        <label htmlFor="image" className="block mb-1">
          Image
        </label>
        <input
          type="file"
          id="image"
          placeholder="Upload image"
          onChange={handleImageChange} 
          className="w-full border-gray-300 rounded-md p-2"
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eventName" className="block mb-1">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <input
            type="text"
            id="category"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Tambahkan input lainnya sesuai kebutuhan */}
        <div>
          <label htmlFor="date" className="block mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="time" className="block mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="availableSeats" className="block mb-1">
            Available Seats
          </label>
          <input
            type="number"
            id="availableSeats"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(parseInt(e.target.value))}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="ticketType" className="block mb-1">
            Ticket Type
          </label>
          <select
            id="ticketType"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
