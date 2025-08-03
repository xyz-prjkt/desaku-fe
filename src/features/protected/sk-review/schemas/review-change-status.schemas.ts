import * as yup from "yup";

export const reviewChangeStatusSchema = yup
  .object({
    status: yup.string().required("Status is required"),
  })
  .required();
