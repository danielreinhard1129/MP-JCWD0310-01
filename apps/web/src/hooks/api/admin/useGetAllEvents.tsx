"use client";

import { axiosInstance } from "@/lib/axios";
import { IEvent } from "@/types/event.type";
import { IPaginationMeta, IPaginationQueries } from "@/types/pagination.type";
import { useEffect, useState } from "react";

interface IGetEventsQuery extends IPaginationQueries {
  search?: string;
}

const useGetAllEvents = (queries: IGetEventsQuery) => {
  const [data, setData] = useState<IEvent[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllEvents = async () => {
    try {
      const { data } = await axiosInstance.get("/events", {
        params: queries,
      });
      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, [queries?.page, queries?.search]);
  return { data, meta, isLoading };
};

export default useGetAllEvents;
