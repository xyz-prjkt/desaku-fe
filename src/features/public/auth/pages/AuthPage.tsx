import { FormProvider } from "@/components/atoms/form";
import { FormInput, PasswordInput } from "@/components/atoms/input";
import { Typography } from "@/components/atoms/typography";
import { ISignInRequest } from "@/interfaces/services/auth";
import { useAuthSignIn } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Space, Tabs } from "antd";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAnt } from "@/hooks";
import { cookies } from "@/libs/cookies";
import { encryptObject } from "@/utils/secure-storage";
import { authSignIn } from "../schemas/auth.schemas";

const AuthPage = () => {
  const { mutateAsync: signIn, isPending: signInIsPending } = useAuthSignIn();
  const formMethods = useForm<ISignInRequest>({
    resolver: yupResolver(authSignIn),
  });
  const { message } = useAnt();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignInRequest) => {
    await signIn(data)
      .then((res) => {
        if (res.success) {
          message.success("Berhasil masuk ke dalam sistem");
          cookies.set("dsk-mddlwr", encryptObject("true", "dsk-mddlwr"));
          navigate("/dashboard");
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
              children: (
                <Space className="w-full" direction="vertical" size="middle">
                  <FormInput
                    name="email"
                    label="Alamat Email"
                    placeholder="nama@example.com"
                  />
                  <div>
                    <PasswordInput
                      name="password"
                      label="Kata Sandi"
                      placeholder="Masukkan Kata Sandi"
                    />

                    <div className="w-full flex justify-between flex-row mt-2">
                      <Link className="justify-end" to="/sso/forgot-password">
                        Lupa kata sandi?
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
                      Masuk
                    </Button>
                  </Space.Compact>
                </Space>
              ),
            },
            {
              label: "Pengguna Baru",
              key: "sign-up",
              children: <div>Sign Up</div>,
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
    </FormProvider>
  );
};

export default AuthPage;
