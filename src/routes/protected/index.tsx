import ProtectedLayout from "@/features/protected/_layouts/ProtectedLayout";
import { IRoute } from "@/interfaces/components/route";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { ACCOUNT_ROUTES } from "./account";
import { ADMIN_ROUTES } from "./admin";
import { VILLAGER_ROUTES } from "./villager";

export const PROTECTED_ROUTE: IRoute = {
  element: (
    <AuthMiddleware>
      <ProtectedLayout />
    </AuthMiddleware>
  ),
  children: [VILLAGER_ROUTES, ADMIN_ROUTES, ACCOUNT_ROUTES],
};
