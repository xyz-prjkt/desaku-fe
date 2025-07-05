import { Layout } from "antd";
import { ReactNode } from "react";
import { Outlet } from "react-router";

interface IAppAuthLayout {
  children?: ReactNode;
}

const AppAuthLayout = ({ children }: IAppAuthLayout) => {
  return (
    <Layout className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white p-8 border rounded-lg flex flex-col md:flex-row mx-6 md:mx-0 z-10">
        {children || <Outlet />}
      </div>
    </Layout>
  );
};

export default AppAuthLayout;
