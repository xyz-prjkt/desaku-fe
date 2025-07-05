import { AppLayout } from "@/components/molecules/layout";
import { SideBarMenu } from "@/components/molecules/sidebar";
import { PROTECTED_ROUTE } from "@/routes/protected";
import { useGetAuthMe } from "@/services/auth.service";
import routeMiddleware from "@/utils/route-middleware";
import { Outlet } from "react-router";

const ProtectedLayout = () => {
  const { data: userProfile } = useGetAuthMe();
  const { allowedRoutes } = routeMiddleware(
    PROTECTED_ROUTE,
    userProfile?.data?.permissions
  );
  return (
    <AppLayout
      logo={<></>}
      appName={"Desaku"}
      sidebarTheme="light"
      sidebarWidth={300}
      sidebarMenu={
        <SideBarMenu
          expandAllByDefault
          className="w-full mb-6"
          sidebarTheme="light"
          routes={[...(allowedRoutes ?? [])]}
          defaultRouteId="Dashboard"
        />
      }
    >
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedLayout;
