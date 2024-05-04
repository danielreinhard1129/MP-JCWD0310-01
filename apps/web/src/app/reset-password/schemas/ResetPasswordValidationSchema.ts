import { yupErrorMessage } from "@/utils/config";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const { message } = yupErrorMessage;

export const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("password is required")
    .min(8, message)
    .minLowercase(1, message)
    .minUppercase(1, message)
    .minNumbers(1, message)
    .minSymbols(1, message),
  confirmPassword: Yup.string()
    .required("Please retype your password")
    .oneOf([Yup.ref("password")], "Your password do not match"),
});
