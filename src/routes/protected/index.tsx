import { Suspense } from "@/components/atoms/suspense";
import ProtectedLayout from "@/features/protected/_layouts/ProtectedLayout";
import SKKematianDetail from "@/features/protected/my-sk/pages/detail/sk-kematian/pages/SKKematianDetail";
import { IRoute } from "@/interfaces/components/route";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import {
  AuditOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FileOutlined,
  SecurityScanOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { lazy } from "react";

const VillagerDashboardPage = lazy(
  () => import("@/features/protected/dashboard/pages/VillagerDashboardPage"),
);

const SKKematianPages = lazy(
  () =>
    import("@/features/protected/request-sk/sk-kematian/pages/SKKematianPages"),
);

const SKTidakMampuPages = lazy(
  () =>
    import(
      "@/features/protected/request-sk/sk-tidak-mampu/pages/SKTidakMampuPages"
    ),
);

const MySKPages = lazy(
  () => import("@/features/protected/my-sk/pages/MySKPages"),
);

const RoleManagementPages = lazy(
  () =>
    import("@/features/protected/role-management/pages/RoleManagementPages"),
);

export const PROTECTED_ROUTE: IRoute = {
  element: (
    <AuthMiddleware>
      <ProtectedLayout />
    </AuthMiddleware>
  ),
  children: [
    {
      id: "Main Menu",
      children: [
        {
          id: "Dashboard",
          icon: <DashboardOutlined />,
          path: "dashboard",
          allowedPermission: ["USER_DASHBOARD"],
          element: (
            <Suspense>
              <VillagerDashboardPage />
            </Suspense>
          ),
        },
        {
          id: "Surat Keterangan Saya",
          icon: <FileOutlined />,
          path: "my-sk",
          allowedPermission: ["VIEW_SK"],
          element: (
            <Suspense>
              <MySKPages />
            </Suspense>
          ),
        },
        {
          id: "Detail SK Kematian",
          hidden: true,
          path: "my-sk/kematian/:id/detail",
          allowedPermission: ["VIEW_SK"],
          element: (
            <Suspense>
              <SKKematianDetail />
            </Suspense>
          ),
        },
        {
          id: "Permohonan SK",
          icon: <AuditOutlined />,
          allowedPermission: ["REQUEST_SK"],
          children: [
            {
              id: "Kematian",
              path: "request-sk/kematian",
              element: (
                <Suspense>
                  <SKKematianPages />
                </Suspense>
              ),
            },
            {
              id: "Tidak Mampu",
              path: "request-sk/tidak-mampu",
              element: (
                <Suspense>
                  <SKTidakMampuPages />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
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
    },
  ],
};
