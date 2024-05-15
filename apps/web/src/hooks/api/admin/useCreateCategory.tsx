// 'use client';

// import { axiosInstance } from '@/lib/axios';
// import { ICategory, ICreateCategory } from '@/types/category.types';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';

// const useCreateCategory = () => {
//   const router = useRouter();
//   const createCategory = async (payload: ICreateCategory) => {
//     try {
//       const { categoryName } = payload;

//       const createCategoryForm = new FormData();

//       createCategoryForm.append('category', categoryName);
      
//       }
//       await axiosInstance.post<ICategory>();
//       // toast success here
//       router.push('/');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         //TODO: put toast here
//         console.log(error);
//       }
//     }
//   };
//   return createCategory ;
// };

// export default useCreateCategory;
