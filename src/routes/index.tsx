import { createBrowserRouter } from "react-router";
import { ADMIN_ROUTE } from "./admin";
import { PUBLIC_ROUTE } from "./public";
import { VILLAGER_ROUTE } from "./villager";
import { FALLBACK_ROUTE } from "./fallback";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [PUBLIC_ROUTE, VILLAGER_ROUTE, FALLBACK_ROUTE],
    },
    {
      path: "/admin",
      children: [ADMIN_ROUTE],
    },
  ],
  {
    basename: "/",
  }
);
