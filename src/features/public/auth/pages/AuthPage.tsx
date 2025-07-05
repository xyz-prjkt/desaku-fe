import { FormProvider } from "@/components/atoms/form";
import { FormInput, PasswordInput } from "@/components/atoms/input";
import { Typography } from "@/components/atoms/typography";
import { ISignInRequest } from "@/interfaces/services/auth";
import { useAuthSignIn } from "@/services/auth.service";
import { Button, Divider, Space } from "antd";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import { authSignIn } from "../schemas/auth.schemas";
import { useAnt } from "@/hooks";
import { cookies } from "@/libs/cookies";
import { encryptObject } from "@/utils/secure-storage";

const AuthPage = () => {
  const { mutateAsync: signIn, isPending: signInIsPending } = useAuthSignIn();
  const formMethods = useForm<ISignInRequest>({
    resolver: yupResolver(authSignIn),
  });
  const { message } = useAnt();

  const onSubmit = async (data: ISignInRequest) => {
    await signIn(data)
      .then((res) => {
        if (res.success) {
          message.success("Sign in successful");
          cookies.set("dsk-mddlwr", encryptObject("true", "dsk-mddlwr"));
          window.location.reload();
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <FormProvider formMethods={{ ...formMethods }} onSubmit={onSubmit}>
      <Space className="md:min-w-96 max-w-96" direction="vertical">
        <div className="flex items-center gap-3 text-purple-800 mb-3">
          <Shield size={42} />
          <div>
            <Typography.P className="text-xl font-semibold text-purple-800">
              Ngubalan Daring
            </Typography.P>
            <Typography.P>Sign in to your account.</Typography.P>
          </div>
        </div>
        <Space className="w-full" direction="vertical" size="middle">
          <FormInput
            name="email"
            label="Email Address"
            placeholder="name@example.com"
          />
          <div>
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter Password"
            />

            <div className="w-full flex justify-between flex-row mt-2">
              <Link className="justify-end" to="/sso/forgot-password">
                Forgot your password?
              </Link>
            </div>
          </div>
          <Space.Compact direction="vertical" className="w-full">
            <Button
              variant="solid"
              color="primary"
              className="w-full"
              htmlType="submit"
              loading={signInIsPending}
              onClick={formMethods.handleSubmit(onSubmit)}
            >
              Sign In
            </Button>
          </Space.Compact>
        </Space>
        <Divider />
        <div className="flex flex-col items-center gap-2">
          <Typography.P className="text-center">
            xyzscape © 2025 All rights reserved.
          </Typography.P>
          <Space>
            <Link to={"#"} className="text-blue-500">
              Privacy Policy
            </Link>
            <Typography.P>•</Typography.P>
            <Link to={"#"} className="text-blue-500">
              User Notice
            </Link>
          </Space>
        </div>
      </Space>
    </FormProvider>
  );
};

export default AuthPage;
