import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const bookingSchema = yup.object().shape({
  reason: yup.string().required("Select your reason for learning the language"),
  fullname: yup.string().required("Enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Enter your email"),
  phone: yup.string().required("Enter your phone number"),
});
