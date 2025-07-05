import { Suspense } from "@/components/atoms/suspense";
import AppAuthLayout from "@/components/molecules/layout/AuthLayout";
import AuthPage from "@/features/public/auth/pages/AuthPage";
import { IRoute } from "@/interfaces/components/route";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { lazy } from "react";

const LandingPage = lazy(
  () => import("@/features/public/landing/pages/LandingPage")
);

export const PUBLIC_ROUTE: IRoute = {
  children: [
    {
      id: "landing-page",
      path: "/",
      element: (
        <Suspense>
          <LandingPage />
        </Suspense>
      ),
    },
    {
      id: "auth",
      element: <AuthMiddleware fromAuth />,
      children: [
        {
          id: "sign-in-or-up",
          path: "auth",
          element: (
            <AppAuthLayout>
              <AuthPage />
            </AppAuthLayout>
          ),
        },
      ],
    },
  ],
};
