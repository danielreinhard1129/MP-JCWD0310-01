import * as Yup from "yup";

export const createEventValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  thumbnail: Yup.array().min(1),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  price: Yup.string().required("price is required"),
  limit: Yup.string().required("limit is required"),
});
