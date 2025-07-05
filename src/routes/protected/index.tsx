import { Suspense } from "@/components/atoms/suspense";
import ProtectedLayout from "@/features/protected/_layouts/VillagerLayout";
import { IRoute } from "@/interfaces/components/route";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { DashboardOutlined } from "@ant-design/icons";
import { lazy } from "react";

const VillagerDashboardPage = lazy(
  () => import("@/features/protected/dashboard/pages/VillagerDashboardPage")
);

export const PROTECTED_ROUTE: IRoute = {
  element: (
    <AuthMiddleware>
      <ProtectedLayout />
    </AuthMiddleware>
  ),
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
      id: "Ajukan Permohonan",
      icon: <DashboardOutlined />,
      allowedPermission: ["REQUEST_SK"],
      path: "request-letter",
    },
  ],
};
