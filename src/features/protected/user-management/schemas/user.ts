import * as yup from "yup";

const updateUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  born_birth: yup.string().required("Birth date is required"),
  born_place: yup.string().required("Birth place is required"),
  gender: yup.string().required("Gender is required"),
  work: yup.string().required("Work is required"),
  marital_status: yup.string().required("Marital status is required"),
  nik: yup
    .string()
    .length(16, "NIK must be exactly 16 characters")
    .required("NIK is required"),
  religion: yup.string().required("Religion is required"),
  address: yup.string().required("Address is required"),
  roleIds: yup.array().of(yup.string()),
  permissionIds: yup.array().of(yup.string()),
});

export { updateUserSchema };
