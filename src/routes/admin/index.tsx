import { Suspense } from "@/components/atoms/suspense";
import { IRoute } from "@/interfaces/components/route";
import { lazy } from "react";

const AdminDashboardPage = lazy(
  () => import("@/features/admin/dashboard/pages/AdminDashboardPage")
);

export const ADMIN_ROUTE: IRoute = {
  children: [
    {
      id: "admin-dashboard",
      path: "dashboard",
      element: (
        <Suspense>
          <AdminDashboardPage />
        </Suspense>
      ),
    },
  ],
};
