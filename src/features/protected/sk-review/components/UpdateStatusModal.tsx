import { FormProvider } from "@/components/atoms/form";
import SKStatusSelectInput from "@/components/general/select/SKStatusSelectInput";
import { ISkReviewChangeStatusBody } from "@/interfaces/services/sk-review";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { reviewChangeStatusSchema } from "../schemas/review-change-status.schemas";
import { useChangeSKReviewStatus } from "@/services/sk-review.service";
import { useAnt } from "@/hooks";

interface IUpdateStatusModalProps {
  open: boolean;
  onClose: () => void;
  skId: string;
}

const UpdateStatusModal = ({
  open,
  onClose,
  skId,
}: IUpdateStatusModalProps) => {
  const { message } = useAnt();
  const formMethods = useForm<ISkReviewChangeStatusBody>({
    resolver: yupResolver(reviewChangeStatusSchema),
  });
  const { mutateAsync: updateStatus } = useChangeSKReviewStatus();

  const handleSubmit = async (data: ISkReviewChangeStatusBody) => {
    await updateStatus({
      data,
      id: skId,
    })
      .then(() => {
        message.success("Status berhasil diperbarui");
        onClose();
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <Modal
      title="Update Status Surat Keterangan"
      open={open}
      onCancel={onClose}
      onOk={formMethods.handleSubmit(handleSubmit)}
      width={600}
    >
      <FormProvider formMethods={formMethods} onSubmit={handleSubmit}>
        <SKStatusSelectInput name="status" label="Status" />
      </FormProvider>
    </Modal>
  );
};

export default UpdateStatusModal;
