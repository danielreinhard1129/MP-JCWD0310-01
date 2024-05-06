import * as Yup from "yup"

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email(),
    password: Yup.string().required("password is required")
})