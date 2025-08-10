import { FlickeringGrid } from "@/components/atoms/backgrounds";
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
      <FlickeringGrid
        className="absolute h-screen w-screen"
        color="#002868"
        squareSize={6}
        gridGap={18}
        maxOpacity={0.8}
        flickerChance={0.6}
      />
    </Layout>
  );
};

export default AppAuthLayout;
