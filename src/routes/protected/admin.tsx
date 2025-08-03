import { Suspense } from "@/components/atoms/suspense";
import SKReviewKematianDetail from "@/features/protected/sk-review/pages/detail/sk-kematian/pages/SKKematianDetail";
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

const UserManagementPages = lazy(
  () =>
    import("@/features/protected/user-management/pages/UserManagementPages"),
);

const SkReviewPages = lazy(
  () => import("@/features/protected/sk-review/pages/SkReviewPages"),
);

export const ADMIN_ROUTES: IRoute = {
  id: "Admin Menu",
  children: [
    {
      id: "Dashboard Admin",
      icon: <DashboardOutlined />,
      path: "dashboard",
      allowedPermission: "ADMIN_DASHBOARD",
    },
    {
      id: "Review Permintaan SK",
      icon: <FileDoneOutlined />,
      path: "review-sk",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SkReviewPages />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/kematian/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKReviewKematianDetail />
        </Suspense>
      ),
    },
    {
      id: "User Management",
      icon: <UsergroupAddOutlined />,
      path: "user-management",
      allowedPermission: "MANAGE_USERS",
      element: (
        <Suspense>
          <UserManagementPages />
        </Suspense>
      ),
    },
    {
      id: "Role Management",
      icon: <SecurityScanOutlined />,
      path: "role-management",
      allowedPermission: "MANAGE_ROLES_PERMISSIONS",
      element: (
        <Suspense>
          <RoleManagementPages />
        </Suspense>
      ),
    },
  ],
};
