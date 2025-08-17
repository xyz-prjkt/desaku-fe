import { FormProvider } from "@/components/atoms/form";
import { FormInput, PasswordInput } from "@/components/atoms/input";
import { useAnt } from "@/hooks";
import { ISignUpRequest } from "@/interfaces/services/auth";
import { cookies } from "@/libs/cookies";
import { useAuthSignIn, useAuthSignUp } from "@/services/auth.service";
import { encryptObject } from "@/utils/secure-storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Space } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { authSignUp } from "../schemas/auth.schemas";

const SignupForm = () => {
  const { mutateAsync: signUp, isPending: signUpIsPending } = useAuthSignUp();
  const { mutateAsync: signIn, isPending: signInIsPending } = useAuthSignIn();

  const formMethods = useForm<ISignUpRequest>({
    resolver: yupResolver(authSignUp),
  });
  const { message } = useAnt();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignUpRequest) => {
    await signUp(data)
      .then(async (res) => {
        if (res.success) {
          await signIn({
            email: data.email,
            password: data.password,
          })
            .then((res) => {
              if (res.success) {
                message.success("Berhasil terdaftar & masuk ke dalam sistem");
                cookies.set("dsk-mddlwr", encryptObject("true", "dsk-mddlwr"));
                navigate("/dashboard");
              }
            })
            .catch((err) => message.error((err as Error).message));
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <FormProvider formMethods={{ ...formMethods }} onSubmit={onSubmit}>
      <Space className="w-full" direction="vertical" size="middle">
        <FormInput
          name="name"
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
        />
        <FormInput
          name="email"
          label="Alamat Email"
          placeholder="email@example.com"
        />
        <PasswordInput
          name="password"
          label="Kata Sandi"
          placeholder="Masukkan Kata Sandi"
        />
        <Space.Compact direction="vertical" className="w-full">
          <Button
            variant="solid"
            color="primary"
            className="w-full"
            htmlType="submit"
            loading={signUpIsPending || signInIsPending}
            onClick={formMethods.handleSubmit(onSubmit)}
          >
            Buat Akun
          </Button>
        </Space.Compact>
      </Space>
    </FormProvider>
  );
};

export default SignupForm;
