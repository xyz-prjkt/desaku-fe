import { Typography } from "@/components/atoms/typography";
import { Divider, Space, Tabs } from "antd";
import { Shield } from "lucide-react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  return (
    <Space className="md:min-w-96 max-w-96" direction="vertical">
      <div className="flex items-center gap-3 text-purple-800 mb-3">
        <Shield size={42} />
        <div>
          <Typography.P className="text-xl font-semibold text-purple-800">
            Desaku Digital
          </Typography.P>
          <Typography.P>Authorisasi ke dalam sistem.</Typography.P>
        </div>
      </div>
      <Tabs
        items={[
          {
            label: "Masuk",
            key: "sign-in",
            children: <LoginForm />,
          },
          {
            label: "Pengguna Baru",
            key: "sign-up",
            children: <SignupForm />,
          },
        ]}
      />

      <Divider />
      <div className="flex flex-col items-center gap-2">
        <Typography.P className="text-center">
          xyzscape © 2025 All rights reserved.
        </Typography.P>
      </div>
    </Space>
  );
};

export default AuthPage;
