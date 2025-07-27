import { ApprovalStatus } from "./status";

interface IApprover {
  id: string;
  name: string;
}

interface IUserApprover {
  id: string;
  user_sk_id: string;
  user_approver_id: string;
  status: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  approver: IApprover;
}

// User Management Interfaces
interface IUser {
  id: string;
  name: string;
  email: string;
  nik?: string;
  gender?: "MALE" | "FEMALE";
  work?: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserRole {
  id: string;
  user_id: string;
  role_id: string;
  created_at: string;
  updated_at: string;
  role: {
    id: string;
    name: string;
  };
}

interface IUserPermission {
  id: string;
  user_id: string;
  permission_id: string;
  created_at: string;
  updated_at: string;
  permission: {
    id: string;
    name: string;
  };
}

interface IUserDetail extends IUser {
  password?: string;
  born_birth?: string;
  born_place?: string;
  marital_status?:
    | "SINGLE"
    | "MARRIED"
    | "DIVORCED"
    | "WIDOWED"
    | "SEPARATED"
    | "SIRI";
  religion?: string;
  address?: string;
  user_roles: IUserRole[];
  user_permissions: IUserPermission[];
}

interface IUpdateUserBody {
  name?: string;
  email?: string;
  born_birth?: string;
  born_place?: string;
  gender?: "MALE" | "FEMALE";
  work?: string;
  marital_status?:
    | "SINGLE"
    | "MARRIED"
    | "DIVORCED"
    | "WIDOWED"
    | "SEPARATED"
    | "SIRI";
  nik?: string;
  religion?: string;
  address?: string;
  roleIds?: string[];
  permissionIds?: string[];
}

export {
  IApprover,
  IUserApprover,
  IUser,
  IUserDetail,
  IUserRole,
  IUserPermission,
  IUpdateUserBody,
};
