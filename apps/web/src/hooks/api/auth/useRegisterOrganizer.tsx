"use client";

import { axiosInstance } from "@/lib/axios";
import { IUser } from "@/types/user.type";
import { appConfig } from "@/utils/config";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IRegisterArgs extends Pick<IUser, "fullName" | "email"> {
  password: string;
}

const useRegisterOrganizer = () => {
  const router = useRouter();
  const register = async (payload: IRegisterArgs) => {
    try {
      
      const { baseURL } = appConfig;
      const { data } = await axiosInstance.post(
        baseURL + `/auth/register-organizer`,
        payload,
      );

      toast(data.message);

      router.push("/login");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    }
  };

  return { register };
};

export default useRegisterOrganizer;
