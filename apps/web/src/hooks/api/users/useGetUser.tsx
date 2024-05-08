"use client";

import { axiosInstance } from "@/lib/axios";
import { IUserDetail } from "@/types/user.type";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

interface IGetUserResponse {
    message: string;
    data: IUserDetail;
  }
const useGetUserById = () => {
  const getUserById = async (id:number):Promise<IGetUserResponse|undefined> => {
    try {
      const { data } = await axiosInstance.get(`/users/${id}`);

      return data
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    }
  };
  useEffect(()=>{getUserById},[])
  return { getUserById };
};

export default useGetUserById;
