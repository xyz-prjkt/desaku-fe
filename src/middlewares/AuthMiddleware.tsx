import { cookies } from "@/libs/cookies";
import { Navigate, Outlet } from "react-router";

type AuthMiddlewareProps = {
  children?: React.ReactNode;
  fromAuth?: boolean;
  fromAuthRedirectUrl?: string;
  unauthorizedRedirectUrl?: string;
};

const AuthMiddleware = ({
  children,
  fromAuth,
  fromAuthRedirectUrl,
  unauthorizedRedirectUrl,
}: AuthMiddlewareProps) => {
  if (fromAuth) {
    return cookies.get("dsk-mddlwr") ? (
      <Navigate to={fromAuthRedirectUrl ?? "/dashboard"} replace />
    ) : (
      <Outlet />
    );
  } else {
    return cookies.get("dsk-mddlwr") ? (
      children ?? <Outlet />
    ) : (
      <Navigate to={unauthorizedRedirectUrl ?? "/401"} replace />
    );
  }
};

export default AuthMiddleware;
