import { FormProvider } from "@/components/atoms/form";
import { FormInput, PasswordInput } from "@/components/atoms/input";
import { useAnt } from "@/hooks";
import { ISignInRequest } from "@/interfaces/services/auth";
import { cookies } from "@/libs/cookies";
import { useAuthSignIn } from "@/services/auth.service";
import { encryptObject } from "@/utils/secure-storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Space } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { authSignIn } from "../schemas/auth.schemas";

const LoginForm = () => {
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
    </FormProvider>
  );
};

export default LoginForm;
