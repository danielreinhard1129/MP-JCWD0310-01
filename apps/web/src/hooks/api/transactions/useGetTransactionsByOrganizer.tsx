'use client';

import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { IStatusTransaction, TRX } from '@/types/transaction.type';
// import { Transaction } from '@/types/tx.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetTransactionsQuery extends IPaginationQueries {
  id: number;
  search?: string;
  status?: IStatusTransaction
}

const useGetTransactionsByOrganizer = (queries: IGetTransactionsQuery) => {
  const [data, setData] = useState<TRX[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTransactions = async () => {
    try {
      const { data } = await axiosInstance.get('/transactions/organizer', {
        params: queries,
      });

      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [queries?.page, queries?.search, queries.id]);

  return { data, isLoading, meta, refetch: getTransactions };
};

export default useGetTransactionsByOrganizer;