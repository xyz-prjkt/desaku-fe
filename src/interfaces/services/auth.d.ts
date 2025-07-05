interface ISignInRequest {
  email: string;
  password: string;
}

interface IRole {
  id: string;
  name: string;
}

type IPermissionName =
  | "USER_DASHBOARD"
  | "ADMIN_DASHBOARD"
  | "REQUEST_SK"
  | "VIEW_SK"
  | "APPROVE_SK";

interface IPermission {
  id: string;
  name: IPermissionName;
}

interface IUserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: IRole[];
  permissions: IPermission[];
}

export { ISignInRequest, IUserProfile, IRole, IPermission, IPermissionName };
