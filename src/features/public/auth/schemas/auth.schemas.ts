import * as yup from "yup";

export const authSignIn = yup
  .object({
    email: yup
      .string()
      .email("Must be valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const authSignUp = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
