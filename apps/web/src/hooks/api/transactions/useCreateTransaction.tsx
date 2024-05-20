"use client";

import { axiosInstance } from "@/lib/axios";
import { IFormCreateTransaction, ITransaction } from "@/types/transaction.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useCreateTransaction = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const createTransaction = async (payload: IFormCreateTransaction) => {
    try {
      const response = await axiosInstance.post<ITransaction>("/transactions", {
        ...payload,
      });
      const { id, total } = response.data;

      router.push(
        `/transaction`,
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };
  return { createTransaction, isLoading: loading };
};

export default useCreateTransaction;