'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { IUser } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ILoginArgs extends Pick<IUser, 'email'> {
  password: string;
}
interface ILoginResponse {
  message: string;
  data: IUser;
  token: string;
}
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const login = async (payload: ILoginArgs) => {
    try {
      const { data } = await axiosInstance.post<ILoginResponse>(
        '/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));

      localStorage.setItem('token', data.token);

      toast(data.message);

      router.replace('/');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    }
  };

  return { login };
};

export default useLogin;
