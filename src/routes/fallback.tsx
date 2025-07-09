import {
  NotFound404Page,
  Restricted403AccessPage,
  Unauthorized401Page,
} from "@/components/pages";
import { IRoute } from "@/interfaces/components/route";

export const FALLBACK_ROUTE: IRoute = {
  children: [
    {
      path: "403",
      element: (
        <Restricted403AccessPage logo={<></>} dashboardUrl="/dashboard" />
      ),
    },
    {
      path: "401",
      element: <Unauthorized401Page logo={<></>} authorizatonUrl="/auth" />,
    },
    {
      path: "*",
      element: <NotFound404Page logo={<></>} dashboardUrl="/dashboard" />,
    },
  ],
};
