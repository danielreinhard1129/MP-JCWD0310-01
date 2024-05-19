"use client";
import FormInput from "@/components/FormInput";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Contact, Ticket } from "lucide-react";

import AuthGuardCustomer from "@/hoc/AuthGuardCustomer";
import useGetUser from "@/hooks/api/users/useGetUser";
import useUpdateUser from "@/hooks/api/users/useUpdateUser";
import { useAppSelector } from "@/redux/hooks";
import { getChangedValues } from "@/utils/getChangedValues";
import { useFormik } from "formik";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import Unaothorized from "@/components/Unaothorized";

const ProfileDetail = ({ params }: { params: { id: string } }) => {
  const { id } = useAppSelector((state) => state.user);
  const { user, isLoading: isLoadingGetUser } = useGetUser(Number(params.id));
  const { isLoading, updateUser } = useUpdateUser(id);

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleDialogSubmit = () => {
    setIsOpen(false);
    handleSubmit();
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    initialValues,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      gender: user?.gender || "",
      phoneNumber: user?.phoneNumber || "",
      referral: user?.referral || "",
    },
    //   validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      const payload = getChangedValues(values, initialValues);
      updateUser(payload);
    },
    enableReinitialize: true,
  });

  if (isLoadingGetUser) {
    return (
      <h1 className="container flex h-screen justify-center px-4 pt-24 text-4xl font-extrabold">
        Loading...
      </h1>
    );
  }

  if (id !== user?.userId) {
    return <Unaothorized />;
  }

  return (
    <section className="min-h-screen px-4 py-6 md:px-36  md:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-4xl">Account Information</h1>
      </div>
      <hr className="my-6 w-full" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="border-r-2 md:col-span-1">
          <div className="flex flex-col justify-center gap-2 px-4">
            <Button
              variant="ghost"
              className="h-12 w-full justify-start text-marine-800 hover:bg-zinc-200 md:h-16"
              onClick={() => router.push(`/profile/${id}/edit`)}
            >
              <Contact className="mr-2 h-6 w-6" />
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              className="h-12 w-full justify-start text-marine-800 hover:bg-zinc-200 md:h-16"
              onClick={() => router.push(`/profile/${id}/transaction-history`)}
            >
              <Calendar className="mr-2 h-6 w-6" />
              Transaction history
            </Button>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="flex flex-col justify-center gap-4 p-2">
            <div className="text-lg font-semibold">Edit Profile</div>

            <div className="md:flex md:flex-row md:gap-8">
              <div className=" hidden gap-[48px] md:mt-7 md:flex md:w-auto md:flex-col">
                <div>First Name: </div>
                <div>Last Name: </div>
                <div>Phone Number: </div>
                <div>Referral: </div>
                <div>Gender: </div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 md:flex md:w-auto md:flex-col md:gap-1">
                  <FormInput
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={values.firstName}
                    error={errors.firstName}
                    isError={!!touched.firstName && !!errors.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormInput
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={values.lastName}
                    error={errors.lastName}
                    isError={!!touched.lastName && !!errors.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormInput
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    error={errors.phoneNumber}
                    isError={!!touched.phoneNumber && !!errors.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormInput
                    name="referral"
                    type="text"
                    placeholder="Referral"
                    value={values.referral}
                    error={errors.referral}
                    isError={!!touched.referral && !!errors.referral}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={true}
                  />
                  <div className="flex items-center">
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-4 h-8 border"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-blue-700">Save</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          className="bg-blue-700"
                          onClick={handleDialogSubmit}
                        >
                          Continue
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthGuardCustomer(ProfileDetail);
