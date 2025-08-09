import { FormProvider } from "@/components/atoms/form";
import { ContentPaper } from "@/components/atoms/paper";
import skKematianSchema from "@/components/general/forms/schemas/sk-kematian.schema";
import SKKematianForm from "@/components/general/forms/SKKematianForm";
import { useAnt } from "@/hooks";
import { ISkKematianCreate } from "@/interfaces/services/sk-kematian";
import { useCreateSkKematian } from "@/services/sk-kematian.service";
import { SaveFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SKKematianPages = () => {
  const navigate = useNavigate();
  const { message } = useAnt();
  const { mutateAsync: createSk, isPending: createSkIsPending } =
    useCreateSkKematian();

  const formMethods = useForm<ISkKematianCreate>({
    resolver: yupResolver(skKematianSchema),
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
    <ContentPaper title="Ajukan Surat Keterangan Kematian">
      <FormProvider formMethods={formMethods} onSubmit={onSubmit}>
        <Alert
          message="Silakan isi data dengan informasi mendiang yang bersangkutan"
          type="info"
          showIcon
          className="mb-4"
        />
        <SKKematianForm />
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

export default SKKematianPages;
