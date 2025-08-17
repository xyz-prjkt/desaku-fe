import { FormProvider } from "@/components/atoms/form";
import { FormInput } from "@/components/atoms/input";
import { ContentPaper } from "@/components/atoms/paper";
import skKematianSchema from "@/components/general/forms/schemas/sk-kematian.schema";
import SKGeneralForm from "@/components/general/forms/SKGeneralForm";
import SKKematianForm from "@/components/general/forms/SKKematianForm";
import ProfileCompletionView from "@/components/general/views/ProfileCompletionView";
import { useAnt } from "@/hooks";
import { ISkKematianCreate } from "@/interfaces/services/sk-kematian";
import { useGetAuthMeProfile } from "@/services/auth.service";
import { useCreateSkKematian } from "@/services/sk-kematian.service";
import { SaveFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Space, Tabs } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SKKematianPages = () => {
  const navigate = useNavigate();
  const { message } = useAnt();
  const { data: userProfile, isLoading: userProfileIsLoading } =
    useGetAuthMeProfile();
  const { mutateAsync: createSk, isPending: createSkIsPending } =
    useCreateSkKematian();

  const formMethods = useForm<ISkKematianCreate>({
    resolver: yupResolver(skKematianSchema),
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
      death_address: undefined,
      death_born_place: undefined,
      death_born_birth: undefined,
      death_gender: undefined,
      death_marital_status: undefined,
      death_name: undefined,
      death_nik: undefined,
      death_religion: undefined,
      death_work: undefined,
      death_date: undefined,
      death_place: undefined,
      death_reason: undefined,
      death_reporter_relation: undefined,
    },
  });

  const onSubmit = async (data: ISkKematianCreate) => {
    await createSk(data)
      .then((res) => {
        if (res.success) {
          message.success("Berhasil mengirim permintaan");
          navigate(`/my-sk/kematian/${res.data.id}/detail`);
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <ContentPaper
      title="Ajukan Surat Keterangan Kematian"
      isLoading={userProfileIsLoading}
    >
      <FormProvider formMethods={formMethods} onSubmit={onSubmit}>
        <ProfileCompletionView>
          <Alert
            message="Silakan isi data dengan informasi mendiang yang bersangkutan"
            type="info"
            showIcon
            className="mb-4"
          />
          <Tabs
            items={[
              {
                key: "reporter",
                label: "Data Pelapor",
                children: (
                  <Space direction="vertical" className="w-full">
                    <SKGeneralForm />
                    <FormInput
                      isRequired
                      name="death_reporter_relation"
                      label="Hubungan Pelapor dengan Almarhum"
                      placeholder="Masukkan hubungan pelapor dengan almarhum"
                    />
                  </Space>
                ),
              },
              {
                key: "deceased",
                label: "Data Mendiang",
                children: <SKKematianForm />,
              },
            ]}
          />

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

export default SKKematianPages;
