import { FormProvider } from "@/components/atoms/form";
import { ContentPaper } from "@/components/atoms/paper";
import skDispensasiSchema from "@/components/general/forms/schemas/sk-dispensasi.schema";
import SKDispensasiForm from "@/components/general/forms/SKDispensasiForm";
import SKGeneralForm from "@/components/general/forms/SKGeneralForm";
import ProfileCompletionView from "@/components/general/views/ProfileCompletionView";
import { useAnt } from "@/hooks";
import { ISkDispensasiCreate } from "@/interfaces/services/sk-dispensasi";
import { useGetAuthMeProfile } from "@/services/auth.service";
import { useCreateSkDispensasi } from "@/services/sk-dispensasi.service";
import { SaveFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Space } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const SKDispensasiPages = () => {
  const navigate = useNavigate();
  const { message } = useAnt();
  const { data: userProfile, isLoading: userProfileIsLoading } =
    useGetAuthMeProfile();
  const { mutateAsync: createSk, isPending: createSkIsPending } =
    useCreateSkDispensasi();

  const formMethods = useForm<ISkDispensasiCreate>({
    resolver: yupResolver(skDispensasiSchema),
    values: {
      address: userProfile?.data?.address,
      born_place: userProfile?.data?.born_place,
      born_birth: userProfile?.data?.born_birth,
      work: userProfile?.data?.work,
      gender: userProfile?.data?.gender,
      marital_status: userProfile?.data?.marital_status,
      name: userProfile?.data?.name,
      nik: userProfile?.data?.nik,
      religion: userProfile?.data?.religion,
      end_date: undefined,
      purpose: undefined,
      reason: undefined,
      start_date: undefined,
    },
  });

  const onSubmit = async (data: ISkDispensasiCreate) => {
    await createSk(data)
      .then((res) => {
        if (res.success) {
          message.success("Berhasil mengirim permintaan");
          navigate(`/my-sk/dispensasi/${res.data.id}/detail`);
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <ContentPaper
      title="Ajukan Surat Keterangan Dispensasi"
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
            <SKDispensasiForm />
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

export default SKDispensasiPages;
