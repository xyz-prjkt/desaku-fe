import * as yup from "yup";

const assignRolePermissionSchema = yup.object({
  roleId: yup.string().required("Role ID is required"),
  permissionIds: yup
    .array()
    .of(yup.string().required())
    .required("Permissions are required"),
});

const editRoleSchema = yup.object({
  name: yup
    .string()
    .required("Role name is required")
    .min(2, "Role name must be at least 2 characters")
    .max(50, "Role name must not exceed 50 characters"),
});

const createRoleSchema = yup.object({
  name: yup
    .string()
    .required("Role name is required")
    .min(1, "Role name must be at least 1 character")
    .max(255, "Role name must not exceed 255 characters")
    .trim(),
});

export { assignRolePermissionSchema, editRoleSchema, createRoleSchema };
