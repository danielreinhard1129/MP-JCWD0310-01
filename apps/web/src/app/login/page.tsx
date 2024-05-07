"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLogin from "@/hooks/api/auth/useLogin";
import { useFormik } from "formik";
import React from "react";
import { LoginValidationSchema } from "./schemas/LoginValidationSchema";
import { useRouter } from "next/navigation";

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
    <main className="container mx-auto px-4">
      <div className="mt-16 flex justify-center">
        <Card className="w-[350px] ">
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
        </Card>
      </div>
    </main>
  );
};

export default Login;
