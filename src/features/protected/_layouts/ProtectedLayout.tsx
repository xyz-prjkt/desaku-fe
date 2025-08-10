import { AppLayout } from "@/components/molecules/layout";
import { useAnt } from "@/hooks";
import { cookies } from "@/libs/cookies";
import { PROTECTED_ROUTE } from "@/routes/protected";
import { useAuthSignOut, useGetAuthMe } from "@/services/auth.service";
import routeMiddleware from "@/utils/route-middleware";
import { LandmarkIcon } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

const ProtectedLayout = () => {
  const { data: userProfile, isLoading: userProfileIsLoading } = useGetAuthMe();
  const { mutateAsync: signOut } = useAuthSignOut();
  const { message } = useAnt();
  const navigate = useNavigate();
  const { allowedRoutes } = routeMiddleware(
    PROTECTED_ROUTE,
    userProfile?.data?.permissions
  );

  const handleSignOut = async () => {
    await signOut().then((res) => {
      if (res.success) {
        message.success("Akun berhasil dikeluarkan");
        cookies.remove("dsk-mddlwr");
        navigate("/auth");
      }
    });
  };

  return (
    <AppLayout
      sidebarRoute={allowedRoutes}
      settings={{
        title: "Desaku Digital Administration",
        layout: "mix",
        fixSiderbar: true,
      }}
      siderWidth={278}
      styles={{
        contentBg: {
          background:
            "radial-gradient(circle at center, #B8D4F0 0%, rgba(184, 212, 240, 0.4) 35%, rgba(220, 235, 250, 0.2) 65%, rgba(245, 250, 255, 0.1) 85%, #ffffff 100%)",
        },
      }}
      logo={
        <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-[#002868] p-1">
          <LandmarkIcon color="white" size={16} />
        </div>
      }
      handleLogout={handleSignOut}
      userIsLoading={userProfileIsLoading}
      user={{
        name: userProfile?.data?.name,
        email: userProfile?.data?.email,
        roles: userProfile?.data?.role,
      }}
    >
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedLayout;
