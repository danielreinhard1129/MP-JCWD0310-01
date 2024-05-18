"use client";

import { axiosInstance } from "@/lib/axios";
import { IEvent, IFormEvent } from "@/types/event.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FileWithPath } from "react-dropzone";
import { toast } from "sonner";

interface ICreateEventResponse {
  message: string;
  data: IFormEvent;
  token: string;
}
const useCreateEvent = () => {
  const router = useRouter();
  const createEvent = async (payload: IFormEvent) => {
    try {
      
      const {
        organizerId,
        title,
        category,
        address,
        city,
        description,
        thumbnail,
        startDate,
        endDate,
        limit,
        price,
        discountName,
        discountLimit,
        discountValue,
        discountExpires,
      } = payload;

      const createEventForm = new FormData();

      createEventForm.append("organizerId", String(organizerId));
      createEventForm.append("title", title);
      createEventForm.append("category", category);
      createEventForm.append("address", address);
      createEventForm.append("city", city);
      createEventForm.append("description", description);
      createEventForm.append("startDate", new Date(startDate).toISOString());
      createEventForm.append("endDate", new Date(endDate).toISOString());
      createEventForm.append("limit", String(limit));
      createEventForm.append("price", String(price));
      if(discountName) createEventForm.append("discountName", String(discountName));
      if(discountLimit)createEventForm.append("discountLimit", String(discountLimit));
      if(discountValue)createEventForm.append("discountValue", String(discountValue));
      if(discountExpires)createEventForm.append("discountExpires", new Date(discountExpires).toISOString());

      thumbnail.forEach((file: FileWithPath) => {
        createEventForm.append("thumbnail", file);
      });
      const data = await axiosInstance.post<IEvent>("/events", createEventForm);
      console.log(data);
      toast("create event success");
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        //TODO: put toast here
        toast.error(error?.response?.data);
        console.log(error);
      }
    }
  };
  return { createEvent };
};

export default useCreateEvent;
