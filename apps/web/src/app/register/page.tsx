"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { RegisterValidationSchema } from "./schemas/RegisterValidationSchema";
import Link from "next/link";

const Register: React.FC = () => {
  const { register } = useRegister();

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        referral: "",
      },
      validationSchema: RegisterValidationSchema,
      onSubmit: (values) => {
        register(values);
      },
    });
  console.log("============", errors);

  return (
    <main className="container mx-auto px-4 min-h-screen my-auto">
      <div className="mt-12 flex justify-center">
        <Card className="w-[350px] shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">Sign-Up!</CardTitle>
            <CardDescription>
              Sign-up and and start enjoying the show!{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="fullName"
                  error={errors.fullName}
                  isError={!!touched.fullName && !!errors.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Type your username here"
                  type="text"
                  value={values.fullName}
                  label="Full Name"
                />

                <FormInput
                  name="email"
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  type="email"
                  value={values.email}
                  label="E-mail"
                />

                <FormInput
                  name="password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                  label="Password"
                />

                <FormInput
                  name="referral"
                  error={errors.referral}
                  isError={!!touched.referral && !!errors.referral}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Referral code"
                  type="text"
                  value={values.referral}
                  label="Referral code (optional)"
                />

                <Button type="submit" className=" mt-6 w-full text-white">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-1">
            <div className="flex justify-start gap-1 text-xs font-extralight">
              Already have an account?
              <Link href="/login" className="underline">
                <p> Login</p>
              </Link>
            </div>
            <div className="flex justify-start gap-1 text-xs font-extralight">
              Want to sign up as an organizer instead?
              <Link href="/register-organizer" className="underline">
                <p>Register</p>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Register;
