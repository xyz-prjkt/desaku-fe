interface ISignInRequest {
  email: string;
  password: string;
}

interface ISignUpRequest {
  name: string;
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
  | "APPROVE_SK"
  | "MANAGE_ROLES_PERMISSIONS"
  | "MANAGE_USERS"
  | "MANAGE_APPROVAL_FLOW";

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

interface IUserProfileCheck {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
  totalFields: number;
  completedFields: number;
}

export {
  IPermission,
  IPermissionName,
  IRole,
  ISignInRequest,
  ISignUpRequest,
  IUserProfile,
  IUserProfileCheck,
};
