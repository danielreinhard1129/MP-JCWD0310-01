import { axiosInstance } from "@/lib/axios";
import { IUserDetail } from "@/types/user.type";
import React, { useState } from "react";
import { toast } from "sonner";

interface IUserDetailUpdateResponse {
  message: string;
}

const useUpdateUser = (userId: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = async (payload: Partial<IUserDetail>) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.patch<IUserDetailUpdateResponse>(
        `/users/${userId}`,
        payload,
      );

      toast.success(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateUser, isLoading };
};

export default useUpdateUser;
