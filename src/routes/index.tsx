import { createBrowserRouter } from "react-router";
import { PUBLIC_ROUTE } from "./public";
import { PROTECTED_ROUTE } from "./protected";
import { FALLBACK_ROUTE } from "./fallback";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [PUBLIC_ROUTE, PROTECTED_ROUTE, FALLBACK_ROUTE],
    },
  ],
  {
    basename: "/",
  }
);
