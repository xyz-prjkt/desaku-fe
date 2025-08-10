import { FormProvider } from "@/components/atoms/form";
import { ContentPaper } from "@/components/atoms/paper";
import skTidakMampuSchema from "@/components/general/forms/schemas/sk-tidak-mampu.schema";
import SKGeneralForm from "@/components/general/forms/SKGeneralForm";
import SKTidakMampuForm from "@/components/general/forms/SKTidakMampuForm";
import { useAnt } from "@/hooks";
import { ISkTidakMampuCreate } from "@/interfaces/services/sk-tidak-mampu";
import { useGetAuthMeProfile } from "@/services/auth.service";
import { useCreateSkTidakMampu } from "@/services/sk-tidak-mampu.service";
import { SaveFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Space } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const SKTidakMampuPages = () => {
  const navigate = useNavigate();
  const { message } = useAnt();
  const { data: userProfile, isLoading: userProfileIsLoading } =
    useGetAuthMeProfile();
  const { mutateAsync: createSk, isPending: createSkIsPending } =
    useCreateSkTidakMampu();

  const formMethods = useForm<ISkTidakMampuCreate>({
    resolver: yupResolver(skTidakMampuSchema),
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
      reason: "",
    },
  });

  const onSubmit = async (data: ISkTidakMampuCreate) => {
    await createSk(data)
      .then((res) => {
        if (res.success) {
          message.success("Berhasil mengirim permintaan");
          navigate(`/my-sk/tidak-mampu/${res.data.id}/detail`);
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <ContentPaper
      title="Ajukan Surat Keterangan Tidak Mampu"
      isLoading={userProfileIsLoading}
    >
      <FormProvider formMethods={formMethods} onSubmit={onSubmit}>
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
          <SKGeneralForm disabled={false} />
          <SKTidakMampuForm />
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
      </FormProvider>
    </ContentPaper>
  );
};

export default SKTidakMampuPages;
