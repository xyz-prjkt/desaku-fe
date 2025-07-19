import { Suspense } from "@/components/atoms/suspense";
import { IRoute } from "@/interfaces/components/route";
import {
  DashboardOutlined,
  FileDoneOutlined,
  SecurityScanOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { lazy } from "react";

const RoleManagementPages = lazy(
  () =>
    import("@/features/protected/role-management/pages/RoleManagementPages"),
);

export const ADMIN_ROUTES: IRoute = {
  id: "Admin Menu",
  children: [
    {
      id: "Dashboard Admin",
      icon: <DashboardOutlined />,
      path: "dashboard",
      allowedPermission: ["ADMIN_DASHBOARD"],
    },
    {
      id: "Review Permintaan SK",
      icon: <FileDoneOutlined />,
      path: "review-sk",
      allowedPermission: ["APPROVE_SK"],
    },
    {
      id: "User Management",
      icon: <UsergroupAddOutlined />,
      path: "user-management",
      allowedPermission: ["MANAGE_USERS"],
    },
    {
      id: "Role Management",
      icon: <SecurityScanOutlined />,
      path: "role-management",
      allowedPermission: ["MANAGE_ROLES_PERMISSIONS"],
      element: (
        <Suspense>
          <RoleManagementPages />
        </Suspense>
      ),
    },
  ],
};
