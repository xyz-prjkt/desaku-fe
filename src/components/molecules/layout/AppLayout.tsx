import { AvatarImage } from "@/components/atoms/avatar";
import { Typography } from "@/components/atoms/typography";
import {
  BellFilled,
  InfoCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  ProLayout,
  ProLayoutProps,
  ProSettings,
} from "@ant-design/pro-components";
import { Avatar, Card, Dropdown, List, Space, Tag } from "antd";
import { CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router";
import { IRoute } from "../sidebar/interfaces";
import { mapToProLayoutMenu } from "../sidebar/functions";

interface IAppLayoutProps extends ProLayoutProps {
  children: ReactNode;
  sidebarRoute: IRoute[];
  styles?: {
    contentBg?: CSSProperties;
  };
  settings?: Partial<ProSettings>;
  userIsLoading?: boolean;
  handleLogout: () => void;
  user?: {
    name?: string;
    email?: string;
    profilePicture?: string;
    roles?: {
      id: string;
      name: string;
    }[];
  };
}

const AppLayout = ({
  children,
  sidebarRoute,
  styles,
  settings,
  user,
  userIsLoading = false,
  handleLogout,
  ...props
}: IAppLayoutProps) => {
  const navigate = useNavigate();

  return (
    <ProLayout
      route={{
        routes: mapToProLayoutMenu(sidebarRoute),
      }}
      menuItemRender={(item, dom) => (
        <div onClick={() => item.path && navigate(item.path)}>{dom}</div>
      )}
      menu={{
        loading: userIsLoading,
        collapsedShowGroupTitle: true,
        defaultOpenAll: true,
        hideMenuWhenCollapsed: false,
        autoClose: false,
        type: "group",
      }}
      actionsRender={() => {
        return [<InfoCircleFilled />, <BellFilled />];
      }}
      avatarProps={
        user
          ? {
              src: <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>,
              size: "small",
              title: user?.name,
              render: (_, dom) => {
                return (
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
                              src={user?.profilePicture}
                              fallback={user?.name?.slice(0, 1)}
                            />
                          </div>
                          <Typography.H5
                            className="text-center"
                            classNameTitle="text-center"
                            subtitle={user?.email}
                          >
                            {user?.name}
                          </Typography.H5>
                          <div className="flex items-center justify-center flex-wrap">
                            {user?.roles?.map((role) => (
                              <Tag className="rounded-full mb-1" key={role.id}>
                                {role.name}
                              </Tag>
                            ))}
                          </div>
                        </Space>
                        <List bordered className="mt-3">
                          <List.Item
                            onClick={() => navigate("/my-profile")}
                            className="cursor-pointer"
                          >
                            <UserOutlined className="mr-2" />
                            Akun Saya
                          </List.Item>
                          <List.Item
                            onClick={handleLogout}
                            className="cursor-pointer"
                          >
                            <LogoutOutlined className="mr-2" />
                            Keluar Akun
                          </List.Item>
                        </List>
                      </Card>
                    )}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }
          : undefined
      }
      contentStyle={{
        background: styles?.contentBg?.background,
        minHeight: "100vh",
        padding: "18px",
      }}
      bgLayoutImgList={[
        {
          src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
          left: 85,
          bottom: 100,
          height: "303px",
        },
        {
          src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
          bottom: -68,
          right: -45,
          height: "303px",
        },
        {
          src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
          bottom: 0,
          left: 0,
          width: "331px",
        },
      ]}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <div
            style={{
              textAlign: "center",
              paddingBlockStart: 12,
            }}
          >
            <div> {settings?.title} © 2025 All rights reserved.</div>
          </div>
        );
      }}
      {...settings}
      {...props}
    >
      {children}
    </ProLayout>
  );
};

export default AppLayout;
