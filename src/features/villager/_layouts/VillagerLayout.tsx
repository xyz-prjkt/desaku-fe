import { AppLayout } from "@/components/molecules/layout";
import { SideBarMenu } from "@/components/molecules/sidebar";
import { VILLAGER_ROUTE } from "@/routes/villager";
import { Outlet } from "react-router";

const VillagerLayout = () => {
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
          routes={[...(VILLAGER_ROUTE.children ?? [])]}
          defaultRouteId="Dashboard"
        />
      }
    >
      <Outlet />
    </AppLayout>
  );
};

export default VillagerLayout;
