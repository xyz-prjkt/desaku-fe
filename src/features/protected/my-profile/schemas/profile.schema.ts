import * as yup from "yup";

const updateProfileSchema = yup.object({
  name: yup.string().required("Name is required"),
  nik: yup
    .string()
    .length(16, "NIK must be exactly 16 characters")
    .required("NIK is required"),
  gender: yup.string().required("Gender is required"),
  born_birth: yup.string().required("Birth date is required"),
  born_place: yup.string().required("Birth place is required"),
  religion: yup.string().required("Religion is required"),
  marital_status: yup.string().required("Marital status is required"),
  work: yup.string().required("Work is required"),
  address: yup.string().required("Address is required"),
});

export { updateProfileSchema };
