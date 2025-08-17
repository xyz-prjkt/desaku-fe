import { Suspense } from "@/components/atoms/suspense";
import AppAuthLayout from "@/components/molecules/layout/AuthLayout";
import { IRoute } from "@/interfaces/components/route";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { lazy } from "react";

const LandingPage = lazy(
  () => import("@/features/public/landing/pages/LandingPage")
);
const AuthPage = lazy(() => import("@/features/public/auth/pages/AuthPage"));
const VerifyPages = lazy(
  () => import("@/features/public/verify/pages/VerifyPages")
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
    {
      id: "verify",
      path: "verify/:id",
      element: <VerifyPages />,
    },
  ],
};
