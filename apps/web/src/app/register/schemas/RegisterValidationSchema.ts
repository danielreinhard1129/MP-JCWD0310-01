import { yupErrorMessage } from "@/utils/config";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const { message } = yupErrorMessage;

export const RegisterValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("full name is required"),
  email: Yup.string().required("email is required").email(),
  referral: Yup.string().notRequired(),
  password: Yup.string()
    .required("password is required")
    .min(8, message)
    .minLowercase(1, message)
    .minUppercase(1, message)
    .minNumbers(1, message)
    .minSymbols(1, message),
});
