'use client';

import { axiosInstance } from '@/lib/axios';
import { IUser, IUserDetail } from '@/types/user.type';
import { appConfig } from '@/utils/config';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useGetUser = (id: number) => {
  const [data, setData] = useState<IUserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {baseURL}  = appConfig

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get(baseURL+`/users/${id}`);

      setData(data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        toast.error(error?.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    getUser();
  }, []);
  return { user: data, isLoading, refetch: getUser };
};
export default useGetUser;
