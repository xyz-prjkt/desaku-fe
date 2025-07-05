import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space, theme } from "antd";
import { CSSProperties, ReactNode, useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

interface IAppLayoutProps {
  children: ReactNode;
  appName: string;
  sidebarTheme?: "light" | "dark";
  sidebarWidth?: number;
  sidebarMenu: ReactNode;
  logo: ReactNode;
  headerComponents?: ReactNode;
  styles?: {
    contentBg?: CSSProperties;
  };
}

const AppLayout = ({
  children,
  sidebarTheme,
  sidebarWidth,
  sidebarMenu,
  appName,
  logo,
  headerComponents,
  styles,
}: IAppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider
        className="overflow-auto sticky h-screen top-0 bottom-0"
        style={{
          insetInlineStart: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
        collapsible
        theme={sidebarTheme}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="xs"
        width={sidebarWidth ?? 250}
        {...(broken && { collapsedWidth: 0 })}
        onBreakpoint={(broken) => {
          setBroken(broken);
        }}
      >
        <div className="p-6">{logo}</div>
        {sidebarMenu}
      </Sider>
      <Layout style={styles?.contentBg}>
        <Header
          className="flex px-6 justify-end items-center sticky top-0 z-50"
          style={{ background: "transparent" }}
        >
          {headerComponents ?? (
            <Space wrap size={16}>
              <Avatar size="default" icon={<UserOutlined />} />
            </Space>
          )}
        </Header>
        <Content className="mx-3 md:mx-8 md:my-3">{children}</Content>
        <Footer style={{ textAlign: "center", background: "transparent" }}>
          {appName} ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
