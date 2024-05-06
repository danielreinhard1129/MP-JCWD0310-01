"use client";

import { axiosInstance } from "@/lib/axios";
import { IUser } from "@/types/user.type";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IResetPassResponse {
  message: string;
}
const useResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (
    password: string,
    confirmPassword: string,
    token: string,
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.patch<IResetPassResponse>(
        "/auth/reset-password",
        { password, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast(data.message);

      router.replace("/login");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading };
};

export default useResetPassword;
