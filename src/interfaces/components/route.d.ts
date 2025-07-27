import { ReactNode } from "react";
import { IPermissionName } from "../services/auth";

interface IRoute {
  id?: string;
  parentId?: string;
  hidden?: boolean;
  allowedPermission?: IPermissionName;
  path?: string;
  element?: ReactNode;
  children?: IRoute[];
  icon?: ReactNode;
}

interface IMenuItem {
  key: string;
  hidden?: boolean;
  name?: string;
  label: JSX.Element;
  icon?: ReactNode;
  children?: IMenuItem[];
}

export type { IMenuItem, IRoute };
