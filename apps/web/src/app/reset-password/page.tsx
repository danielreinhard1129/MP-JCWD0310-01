'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useResetPassword from '@/hooks/api/auth/useResetPassword';
import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import { notFound, useSearchParams } from 'next/navigation';
import React from 'react';
import { ResetPasswordValidationSchema } from './schemas/ResetPasswordValidationSchema';

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    notFound();
  }

  const { isLoading, resetPassword } = useResetPassword();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema: ResetPasswordValidationSchema,
      onSubmit: ({ password, confirmPassword }) => {
        resetPassword(password,confirmPassword, token);
      },
    });

  return (
    <main className="container mx-auto px-4">
      <div className="mt-16 flex justify-center">
        <Card className="w-[350px] ">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">
              Reset your password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="password"
                  label="Type your new password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                />
                <FormInput
                  name="confirmPassword"
                  label="Confirm your new password"
                  error={errors.confirmPassword}
                  isError={
                    !!touched.confirmPassword && !!errors.confirmPassword
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="confirm password"
                  type="password"
                  value={values.confirmPassword}
                />
                <Button
                  type="submit"
                  className=" mt-6 w-full text-white"
                  disabled={isLoading}
                >
                  {isLoading ?? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? 'Email sent' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPassword;
