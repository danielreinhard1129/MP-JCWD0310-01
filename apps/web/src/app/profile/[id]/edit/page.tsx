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
    <section className="px-6 py-10 md:px-36">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Account Information</h1>
      </div>
      <hr className="my-6 w-full" />

      {/* profile account */}

      <div className="grid grid-cols-5">
        {/* ========SIDEBAR========= */}
        <div className="min-w-full border-r-2">
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
            <Button
              variant="ghost"
              className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
              onClick={() => router.push(`/profile/${id}/edit`)}
            >
              <Contact className="mr-2 h-6 w-6" />
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
              onClick={() => router.push(`/profile/${id}/transaction-history`)}
            >
              <Calendar className="mr-2 h-6 w-6" />
              Transaction history
            </Button>
            <Button
              variant="ghost"
              className="h-16 w-full justify-start text-marine-800 hover:bg-zinc-200"
              onClick={() => router.push(`/profile/${id}/vouchers`)}
            >
              <Ticket className="mr-2 h-6 w-6" />
              Points & Vouchers
            </Button>
          </div>
        </div>

        {/* =============MAIN========== */}
        <div className="col-span-4 ml-16 ">
          <div className="flex flex-col justify-center gap-4 p-2">
            <div className=" text-lg font-semibold">Edit Profile</div>
            <div className="flex md:flex-row md:gap-8">
              <div className="flex flex-col gap-7 md:w-auto md:py-4">
                <div>First Name: </div>
                <div>Last Name: </div>
                <div>Phone Number: </div>
                <div>Referral: </div>
                <div>Gender: </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="min-w-[400px]">
                  <div className="flex w-full flex-col gap-[7px] md:w-auto">
                    <FormInput
                      name="firstName"
                      type="text"
                      placeholder={
                        values.firstName === "" ? "" : "Type your Username here"
                      }
                      value={values.firstName}
                      error={errors.firstName}
                      isError={!!touched.firstName && !!errors.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput
                      name="lastName"
                      type="text"
                      placeholder={
                        values.lastName === "" ? "" : "Type your Username here"
                      }
                      value={values.lastName}
                      error={errors.lastName}
                      isError={!!touched.lastName && !!errors.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput
                      name="phoneNumber"
                      type="text"
                      placeholder="Type your phone number here"
                      value={values.phoneNumber}
                      error={errors.phoneNumber}
                      isError={!!touched.phoneNumber && !!errors.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput
                      name="referral"
                      type="text"
                      placeholder={
                        values.referral === "" ? "" : "Type your Username here"
                      }
                      value={values.referral}
                      error={errors.referral}
                      isError={!!touched.referral && !!errors.referral}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={true}
                    />
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-2 h-8 border"
                      style={{ display: "block" }}
                    >
                      <option value="MALE" label="Male">
                        {" "}
                        Male
                      </option>
                      <option value="FEMALE" label="Female">
                        Female
                      </option>
                    </select>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-blue-700">Save</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription></AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button
                            className="bg-blue-700"
                            onClick={handleDialogSubmit}
                          >
                            Continue
                          </Button>
                          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthGuardCustomer(ProfileDetail);
