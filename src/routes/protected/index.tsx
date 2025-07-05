import { Suspense } from "@/components/atoms/suspense";
import ProtectedLayout from "@/features/protected/_layouts/ProtectedLayout";
import SKKematianDetail from "@/features/protected/my-sk/pages/detail/sk-kematian/pages/SKKematianDetail";
import { IRoute } from "@/interfaces/components/route";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import {
  AuditOutlined,
  DashboardOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { lazy } from "react";

const VillagerDashboardPage = lazy(
  () => import("@/features/protected/dashboard/pages/VillagerDashboardPage")
);

const SKKematianPages = lazy(
  () =>
    import("@/features/protected/request-sk/sk-kematian/pages/SKKematianPages")
);

const SKTidakMampuPages = lazy(
  () =>
    import(
      "@/features/protected/request-sk/sk-tidak-mampu/pages/SKTidakMampuPages"
    )
);

const MySKPages = lazy(
  () => import("@/features/protected/my-sk/pages/MySKPages")
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
      id: "Ajukan Permohonan SK",
      icon: <AuditOutlined />,
      allowedPermission: ["REQUEST_SK"],
      children: [
        {
          id: "Surat Keterangan Kematian",
          path: "request-sk/kematian",
          element: (
            <Suspense>
              <SKKematianPages />
            </Suspense>
          ),
        },
        {
          id: "Surat Keterangan Tidak Mampu",
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
};
