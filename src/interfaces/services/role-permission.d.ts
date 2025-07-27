import { IPermissionName } from "./auth";

interface IRoleResponse {
  id: string;
  name: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

interface IRoleBody {
  name: string;
}

interface IPermissionResponse {
  id: string;
  name: IPermissionName;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

interface IRolePermissionResponse {
  id: string;
  role_id: string;
  permission_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  permission: {
    id: string;
    name: IPermissionName;
  };
}

interface IRoleDetailResponse extends IRoleResponse {
  permissions: IRolePermissionResponse[];
}

interface IAssignRolePermissionBody {
  roleId: string;
  permissionIds: string[];
}

interface IAssignUserRoleBody {
  userId: string;
  roleIds: string[];
}

interface IAssignUserPermissionBody {
  userId: string;
  permissionIds: string[];
}

export {
  IAssignRolePermissionBody,
  IAssignUserPermissionBody,
  IAssignUserRoleBody,
  IPermissionResponse,
  IRoleBody,
  IRoleDetailResponse,
  IRolePermissionResponse,
  IRoleResponse,
};
