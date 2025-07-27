import * as yup from "yup";

const updateUserSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(32, "Name must not exceed 32 characters")
    .optional()
    .nullable(),
  email: yup.string().email("Invalid email format").optional().nullable(),
  born_birth: yup.string().optional().nullable(),
  born_place: yup.string().optional().nullable(),
  gender: yup
    .string()
    .oneOf(["MALE", "FEMALE"], "Gender must be MALE or FEMALE")
    .optional()
    .nullable(),
  work: yup.string().optional().nullable(),
  marital_status: yup
    .string()
    .oneOf(
      ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "SEPARATED", "SIRI"],
      "Invalid marital status"
    )
    .optional()
    .nullable(),
  nik: yup
    .string()
    .length(16, "NIK must be exactly 16 characters")
    .optional()
    .nullable(),
  religion: yup.string().optional().nullable(),
  address: yup.string().optional().nullable(),
  roleIds: yup.array().of(yup.string().required()).optional().nullable(),
  permissionIds: yup.array().of(yup.string().required()).optional().nullable(),
});

export { updateUserSchema };
