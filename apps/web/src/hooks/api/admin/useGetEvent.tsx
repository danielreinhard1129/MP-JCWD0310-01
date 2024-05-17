"use client";

import { axiosInstance } from "@/lib/axios";
import { IEvent } from "@/types/event.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useGetEvent = (id: Number) => {
  const [data, setData] = useState<IEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getEvent = async () => {
    try {
      const { data } = await axiosInstance.get(`/events/${id}`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getEvent();
  }, []);
  return { event: data, isLoading, refetch: getEvent };
};

export default useGetEvent;
