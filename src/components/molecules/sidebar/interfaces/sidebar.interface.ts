import { JSX, ReactNode } from "react";

interface IRoute {
  id?: string;
  parentId?: string;
  hidden?: boolean;
  allowedPermission?: string[];
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

export type { IRoute, IMenuItem };
