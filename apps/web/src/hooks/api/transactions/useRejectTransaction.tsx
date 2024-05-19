'use client';

import { toast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { IStatusTransaction } from '@/types/transaction.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface AcceptTransactionArgs {
  id: number;
}

const useRejectTransaction = () => {
  const router = useRouter();
  const rejecting = async (payload: AcceptTransactionArgs) => {
    try {
        await axiosInstance.post('/transactions/rejecting', payload);

      location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4 border-mythemes-darkpink text-mythemes-darkpink',
          ),
          variant: 'default',
          title: error?.response?.data,
        });
      }
    }
  };
  return { rejecting };
};

export default useRejectTransaction;