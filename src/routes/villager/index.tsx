import { Suspense } from "@/components/atoms/suspense";
import VillagerLayout from "@/features/villager/_layouts/VillagerLayout";
import { IRoute } from "@/interfaces/components/route";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { DashboardOutlined } from "@ant-design/icons";
import { lazy } from "react";

const VillagerDashboardPage = lazy(
  () => import("@/features/villager/dashboard/pages/VillagerDashboardPage")
);

export const VILLAGER_ROUTE: IRoute = {
  element: (
    <AuthMiddleware>
      <VillagerLayout />
    </AuthMiddleware>
  ),
  children: [
    {
      id: "Dashboard",
      icon: <DashboardOutlined />,
      path: "dashboard",
      element: (
        <Suspense>
          <VillagerDashboardPage />
        </Suspense>
      ),
    },
    {
      id: "Ajukan Permohonan",
      icon: <DashboardOutlined />,
      path: "request-letter",
    },
    {
      id: "Cek Permohonan",
      icon: <DashboardOutlined />,
      path: "check-request-letter",
    },
  ],
};
