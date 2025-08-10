import { Suspense } from "@/components/atoms/suspense";
import { IRoute } from "@/interfaces/components/route";
import { lazy } from "react";

const MyProfilePage = lazy(
  () => import("@/features/protected/my-profile/pages/MyProfilePage")
);

export const ACCOUNT_ROUTES: IRoute = {
  children: [
    {
      hidden: true,
      path: "my-profile",
      element: (
        <Suspense>
          <MyProfilePage />
        </Suspense>
      ),
    },
  ],
};
