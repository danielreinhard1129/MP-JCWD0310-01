"use client";
import FormInput from "@/components/FormInput";
import AuthGuardCustomer from "@/hoc/AuthGuardCustomer";
import useGetUserById from "@/hooks/api/users/useGetUser";
import { IUserDetail } from "@/types/user.type";
import { useFormik } from "formik";
import {
    FC,
    useEffect,
    useState
} from "react";

interface ProfileDetailProps {
  params: {
    id: string;
  };
}

const ProfileDetail: FC<ProfileDetailProps> = ({ params }) => {

  const { getUserById } = useGetUserById();
  const [user, setUser] = useState<IUserDetail>();


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserById(Number(params.id));

        if(data){
            setUser(data.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile()
  },[params.id]);

    // console.log(user);
    // console.log();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched, initialValues, setValues} =
    useFormik({
      initialValues: {
        firstName: '' ,
        lastName: user?.lastName || "",
        gender: user?.gender||"",
        phoneNumber: user?.phoneNumber||"",
      },
      //   validationSchema: LoginValidationSchema,
      onSubmit: (values) => {},
    });
    // console.log(user?.firstName);
    // console.log(initialValues.firstName);
    
  return (
    <main className="container mx-auto px-4">
      <form action="" onSubmit={handleSubmit}>
        <div className="mx-auto mt-4 flex max-w-sm flex-col gap-4">
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            placeholder=""
            // value={user?.firstName!}
            value={user?.firstName!}
            error={errors.firstName}
            isError={!!touched.firstName && !!errors.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={false}
          />
          <FormInput
            name="lastName"
            type="text"
            label="last Name"
            placeholder={user?.lastName!}
            // value={user?.firstName!}
            value={values.lastName}
            error={errors.lastName}
            isError={!!touched.lastName && !!errors.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            
          />
          <FormInput
            name="phoneNumber"
            type="text"
            label="Phone Number"
            placeholder={user?.phoneNumber!}
            // value={user?.firstName!}
            value={values.phoneNumber}
            error={errors.phoneNumber}
            isError={!!touched.phoneNumber && !!errors.phoneNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={false}
          />
        </div>
      </form>
    </main>
  );
};

export default AuthGuardCustomer(ProfileDetail);
