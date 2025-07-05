import { AvatarImage } from "@/components/atoms/avatar";
import { Typography } from "@/components/atoms/typography";
import { AppLayout } from "@/components/molecules/layout";
import { SideBarMenu } from "@/components/molecules/sidebar";
import { useAnt } from "@/hooks";
import { cookies } from "@/libs/cookies";
import { PROTECTED_ROUTE } from "@/routes/protected";
import { useAuthSignOut, useGetAuthMe } from "@/services/auth.service";
import routeMiddleware from "@/utils/route-middleware";
import { Card, Dropdown, List, Space, Tag } from "antd";
import { Outlet, useNavigate } from "react-router";

const ProtectedLayout = () => {
  const { data: userProfile } = useGetAuthMe();
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
      logo={<></>}
      appName={"Desaku"}
      headerComponents={
        <Space wrap size={16}>
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => (
              <Card className="max-w-80 min-w-72 shadow-2xl">
                <Space
                  className="items-center w-full"
                  direction="vertical"
                  size="middle"
                >
                  <div className="p-1 w-fit rounded-full border-2 border-blue-500 border-dotted">
                    <AvatarImage
                      size={72}
                      src={""}
                      fallback={userProfile?.data?.name?.slice(0, 1)}
                    />
                  </div>
                  <Typography.H5
                    className="text-center"
                    classNameTitle="text-center"
                    subtitle={userProfile?.data?.email}
                  >
                    {userProfile?.data?.name}
                  </Typography.H5>
                  <div className="flex items-center justify-center flex-wrap">
                    {userProfile?.data?.role?.map((role) => (
                      <Tag className="rounded-full mb-1" key={role.id}>
                        {role.name}
                      </Tag>
                    ))}
                  </div>
                </Space>
                <List bordered size="small" className="w-full mt-6">
                  <List.Item className="w-full cursor-pointer">
                    Pengaturan Akun
                  </List.Item>
                  <List.Item
                    onClick={handleSignOut}
                    className="w-full cursor-pointer"
                  >
                    Keluar Akun
                  </List.Item>
                </List>
              </Card>
            )}
          >
            <div>
              <AvatarImage
                size={36}
                src={""}
                fallback={userProfile?.data?.name.slice(0, 1)}
              />
            </div>
          </Dropdown>
        </Space>
      }
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
