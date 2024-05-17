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
import useRegisterOrganizer from "@/hooks/api/auth/useRegisterOrganizer";
import { useFormik } from "formik";
import { RegisterOrganizerValidationSchema } from "./schemas/RegisterValidationSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterOrganizer: React.FC = () => {
  const { register } = useRegisterOrganizer();
  const router = useRouter();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        
      },
      validationSchema: RegisterOrganizerValidationSchema,
      onSubmit: (values) => {
        register(values);
      },
    });
  

  return (
    <main className="container mx-auto px-4 min-h-screen">
      <div className="mt-24 flex justify-center">
        <Card className="w-[350px] shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">Sign-Up as an Organizer!</CardTitle>
            <CardDescription>Sign-up as an organizer and create your own event! </CardDescription>
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


                <Button type="submit" className=" mt-6 w-full text-white" onClick={() => router.push("/")}>
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-start">
          <div className="flex justify-start gap-1 text-xs font-extralight">
              Already have an account?
              <Link href="/login" className="underline">
                <p> Login</p>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default RegisterOrganizer;
