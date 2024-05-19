"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useLogin from "@/hooks/api/auth/useLogin";
import { useFormik } from "formik";
import React from "react";
import { LoginValidationSchema } from "./schemas/LoginValidationSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login: React.FC = () => {
  const { login } = useLogin();
  const router = useRouter();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidationSchema,
      onSubmit: (values) => {
        login(values);
      },
    });

  return (
    <main className="container mx-auto px-4 min-h-screen">
      <div className="mt-32 flex justify-center">
        <Card className="w-[350px] shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="email"
                  label="E-mail"
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  type="email"
                  value={values.email}
                />

                <FormInput
                  name="password"
                  label="Password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                />
                <p
                  onClick={() => router.push("/forgot-password")}
                  className="cursor-pointer text-xs underline"
                >
                  Forgot password?
                </p>
                <Button type="submit" className=" mt-6 w-full text-white">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex justify-start gap-1 text-xs font-extralight">
              Don&apos;t have have an account?
              <Link href="/register" className="underline">
                <p> Register</p>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Login;
