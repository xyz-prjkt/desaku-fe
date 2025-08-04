import { FormProvider } from "@/components/atoms/form";
import { FormInput, PasswordInput } from "@/components/atoms/input";
import { useAnt } from "@/hooks";
import { ISignUpRequest } from "@/interfaces/services/auth";
import { useAuthSignUp } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Space } from "antd";
import { useForm } from "react-hook-form";
import { authSignUp } from "../schemas/auth.schemas";

const SignupForm = () => {
  const { mutateAsync: signUp, isPending: signUpIsPending } = useAuthSignUp();
  const formMethods = useForm<ISignUpRequest>({
    resolver: yupResolver(authSignUp),
  });
  const { message } = useAnt();

  const onSubmit = async (data: ISignUpRequest) => {
    await signUp(data)
      .then((res) => {
        if (res.success) message.success("Berhasil daftar ke dalam sistem");
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
            loading={signUpIsPending}
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
