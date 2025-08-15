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
  () => import("@/features/protected/role-management/pages/RoleManagementPages")
);

const UserManagementPages = lazy(
  () => import("@/features/protected/user-management/pages/UserManagementPages")
);

const SkReviewPages = lazy(
  () => import("@/features/protected/sk-review/pages/SkReviewPages")
);

const SKKematianDetailView = lazy(
  () => import("@/components/general/views/SKKematianDetailView")
);

const SKTidakMampuDetailView = lazy(
  () => import("@/components/general/views/SKTidakMampuDetailView")
);

const SKDispensasiDetailView = lazy(
  () => import("@/components/general/views/SKDispensasiDetailView")
);

const SKBedaNamaDetailView = lazy(
  () => import("@/components/general/views/SKBedaNamaDetailView")
);

const SKDomisiliDetailView = lazy(
  () => import("@/components/general/views/SKDomisiliDetailView")
);

const SKKehilanganDetailView = lazy(
  () => import("@/components/general/views/SKKehilanganDetailView")
);

const SKKelahiranDetailView = lazy(
  () => import("@/components/general/views/SKKelahiranDetailView")
);

const SKUsahaDetailView = lazy(
  () => import("@/components/general/views/SKUsahaDetailView")
);

const SKKtpSementaraDetailView = lazy(
  () => import("@/components/general/views/SKKtpSementaraDetailView")
);

const SKApprovalFlowPage = lazy(
  () => import("@/features/protected/sk-approval-flow/pages/SKApprovalFlowPage")
);

export const ADMIN_ROUTES: IRoute = {
  id: "Menu Pegawai",
  children: [
    {
      id: "Dashboard Pegawai",
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
          <SKKematianDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/tidak-mampu/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKTidakMampuDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/dispensasi/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKDispensasiDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/beda-nama/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKBedaNamaDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/domisili/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKDomisiliDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/kehilangan/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKKehilanganDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/kelahiran/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKKelahiranDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/usaha/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKUsahaDetailView type="review" />
        </Suspense>
      ),
    },
    {
      hidden: true,
      path: "review-sk/ktp-sementara/:id/detail",
      allowedPermission: "APPROVE_SK",
      element: (
        <Suspense>
          <SKKtpSementaraDetailView type="review" />
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
      id: "Approval Flow Management",
      icon: <SecurityScanOutlined />,
      path: "approval-flow",
      allowedPermission: "MANAGE_APPROVAL_FLOW",
      element: (
        <Suspense>
          <SKApprovalFlowPage />
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
