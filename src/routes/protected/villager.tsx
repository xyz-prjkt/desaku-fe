import { Suspense } from "@/components/atoms/suspense";
import { IRoute } from "@/interfaces/components/route";
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

const SKKelahiranAnakPages = lazy(
  () =>
    import(
      "@/features/protected/request-sk/sk-kelahiran/pages/SKKelahiranPages"
    )
);

const SKDomisiliPages = lazy(
  () =>
    import("@/features/protected/request-sk/sk-domisili/pages/SKDomisiliPages")
);

const SKKehilanganPages = lazy(
  () =>
    import(
      "@/features/protected/request-sk/sk-kehilangan/pages/SKKehilanganPages"
    )
);

const SKBedaNamaPages = lazy(
  () =>
    import("@/features/protected/request-sk/sk-beda-nama/pages/SKBedaNamaPages")
);

const SKKTPSementaraPages = lazy(
  () =>
    import(
      "@/features/protected/request-sk/sk-ktp-sementara/pages/SKKTPSementaraPages"
    )
);

const SKDispensasiPages = lazy(
  () =>
    import(
      "@/features/protected/request-sk/sk-dispensasi/pages/SKDispensasiPages"
    )
);

const SKUsahaPages = lazy(
  () => import("@/features/protected/request-sk/sk-usaha/pages/SKUsahaPages")
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

export const VILLAGER_ROUTES: IRoute = {
  id: "Main Menu",
  children: [
    {
      id: "Dashboard",
      icon: <DashboardOutlined />,
      path: "dashboard",
      allowedPermission: "USER_DASHBOARD",
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
      allowedPermission: "VIEW_SK",
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
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKKematianDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK Tidak Mampu",
      hidden: true,
      path: "my-sk/tidak-mampu/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKTidakMampuDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK Dispensasi",
      hidden: true,
      path: "my-sk/dispensasi/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKDispensasiDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK Beda Nama",
      hidden: true,
      path: "my-sk/beda-nama/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKBedaNamaDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK Domisili",
      hidden: true,
      path: "my-sk/domisili/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKDomisiliDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK Kehilangan",
      hidden: true,
      path: "my-sk/kehilangan/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKKehilanganDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK Kelahiran",
      hidden: true,
      path: "my-sk/kelahiran/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKKelahiranDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK Usaha",
      hidden: true,
      path: "my-sk/usaha/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKUsahaDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Detail SK KTP Sementara",
      hidden: true,
      path: "my-sk/ktp-sementara/:id/detail",
      allowedPermission: "VIEW_SK",
      element: (
        <Suspense>
          <SKKtpSementaraDetailView type="view" />
        </Suspense>
      ),
    },
    {
      id: "Permohonan SK",
      icon: <AuditOutlined />,
      allowedPermission: "REQUEST_SK",
      children: [
        {
          id: "Kematian",
          path: "request-sk/kematian",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKKematianPages />
            </Suspense>
          ),
        },
        {
          id: "Tidak Mampu",
          path: "request-sk/tidak-mampu",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKTidakMampuPages />
            </Suspense>
          ),
        },
        {
          id: "Kelahiran & Anak",
          path: "request-sk/kelahiran",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKKelahiranAnakPages />
            </Suspense>
          ),
        },
        {
          id: "Domisili",
          path: "request-sk/domisili",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKDomisiliPages />
            </Suspense>
          ),
        },
        {
          id: "Kehilangan",
          path: "request-sk/kehilangan",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKKehilanganPages />
            </Suspense>
          ),
        },
        {
          id: "Beda Nama",
          path: "request-sk/beda-nama",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKBedaNamaPages />
            </Suspense>
          ),
        },
        {
          id: "KTP Sementara",
          path: "request-sk/ktp-sementara",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKKTPSementaraPages />
            </Suspense>
          ),
        },
        {
          id: "Dispensasi",
          path: "request-sk/dispensasi",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKDispensasiPages />
            </Suspense>
          ),
        },
        {
          id: "Usaha",
          path: "request-sk/usaha",
          allowedPermission: "REQUEST_SK",
          element: (
            <Suspense>
              <SKUsahaPages />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
