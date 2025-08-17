import { FormProvider } from "@/components/atoms/form";
import { ContentPaper } from "@/components/atoms/paper";
import skKelahiranSchema from "@/components/general/forms/schemas/sk-kelahiran.schema";
import SKGeneralForm from "@/components/general/forms/SKGeneralForm";
import SKKelahiranForm from "@/components/general/forms/SKKelahiranForm";
import ProfileCompletionView from "@/components/general/views/ProfileCompletionView";
import { useAnt } from "@/hooks";
import { ISkKelahiranCreate } from "@/interfaces/services/sk-kelahiran";
import { useGetAuthMeProfile } from "@/services/auth.service";
import { useCreateSkKelahiran } from "@/services/sk-kelahiran.service";
import { SaveFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Space } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const SKKelahiranPages = () => {
  const navigate = useNavigate();
  const { message } = useAnt();
  const { data: userProfile, isLoading: userProfileIsLoading } =
    useGetAuthMeProfile();
  const { mutateAsync: createSk, isPending: createSkIsPending } =
    useCreateSkKelahiran();

  const formMethods = useForm<ISkKelahiranCreate>({
    resolver: yupResolver(skKelahiranSchema),
    values: {
      address: userProfile?.data?.address,
      born_place: userProfile?.data?.born_place,
      born_birth: userProfile?.data?.born_birth,
      gender: userProfile?.data?.gender,
      marital_status: userProfile?.data?.marital_status,
      name: userProfile?.data?.name,
      nik: userProfile?.data?.nik,
      religion: userProfile?.data?.religion,
      work: userProfile?.data?.work,
      father_name: undefined,
      mother_name: undefined,
    },
  });

  const onSubmit = async (data: ISkKelahiranCreate) => {
    await createSk(data)
      .then((res) => {
        if (res.success) {
          message.success("Berhasil mengirim permintaan");
          navigate(`/my-sk/kelahiran/${res.data.id}/detail`);
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <ContentPaper
      title="Ajukan Surat Keterangan Kelahiran"
      isLoading={userProfileIsLoading}
    >
      <FormProvider formMethods={formMethods} onSubmit={onSubmit}>
        <ProfileCompletionView>
          <Space direction="vertical" className="w-full">
            <Alert
              message="Apabila terdapat kesalahan pada data pribadi, silakan melakukan perubahan melalui Profil Saya"
              type="info"
              showIcon
              className="mb-4"
              action={
                <Link to="/my-profile">
                  <Button color="blue" variant="solid">
                    Ubah Profil
                  </Button>
                </Link>
              }
            />
            <SKGeneralForm />
            <SKKelahiranForm />
          </Space>
          <Button
            icon={<SaveFilled />}
            loading={createSkIsPending}
            type="primary"
            className="mt-6"
            onClick={formMethods.handleSubmit(onSubmit)}
          >
            Submit Permintaan Surat Keterangan
          </Button>
        </ProfileCompletionView>
      </FormProvider>
    </ContentPaper>
  );
};

export default SKKelahiranPages;
