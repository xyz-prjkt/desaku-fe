import { FormProvider } from "@/components/atoms/form";
import { ContentPaper } from "@/components/atoms/paper";
import skTidakMampuSchema from "@/components/general/forms/schemas/sk-tidak-mampu.schema";
import SKTidakMampuForm from "@/components/general/forms/SKTidakMampuForm";
import { useAnt } from "@/hooks";
import { ISkTidakMampuCreate } from "@/interfaces/services/sk-tidak-mampu";
import { useCreateSkTidakMampu } from "@/services/sk-tidak-mampu.service";
import { SaveFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SKTidakMampuPages = () => {
  const navigate = useNavigate();
  const { message } = useAnt();
  const { mutateAsync: createSk, isPending: createSkIsPending } =
    useCreateSkTidakMampu();

  const formMethods = useForm<ISkTidakMampuCreate>({
    resolver: yupResolver(skTidakMampuSchema),
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
    <ContentPaper title="Ajukan Surat Keterangan Tidak Mampu">
      <FormProvider formMethods={formMethods} onSubmit={onSubmit}>
        <SKTidakMampuForm />
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
