"use client";
import FormInput from "@/components/FormInput";
import AuthGuardCustomer from "@/hoc/AuthGuardCustomer";
import useGetUser from "@/hooks/api/users/useGetUser";
import useGetUserById from "@/hooks/api/users/useGetUser";
import { useAppSelector } from "@/redux/hooks";
import { IUserDetail } from "@/types/user.type";
import { useFormik } from "formik";
import { notFound } from "next/navigation";
import { FC, useEffect, useState } from "react";

const ProfileDetail = ({ params }: { params: { id: string } }) => {
  const { id } = useAppSelector((state) => state.user);
  const { user, isLoading } = useGetUser(Number(params.id));

  console.log(user);

  // if (!user) {
  //   return notFound();
  // }

  // console.log(user);
  // console.log();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    initialValues,
    setValues,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName || "",
      gender: user?.gender || "",
      phoneNumber: user?.phoneNumber || "",
    },
    //   validationSchema: LoginValidationSchema,
    onSubmit: (values) => {},
  });
  // console.log(user?.firstName);
  // console.log(initialValues.firstName);
  console.log(values);

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
            value={values.firstName!}
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
