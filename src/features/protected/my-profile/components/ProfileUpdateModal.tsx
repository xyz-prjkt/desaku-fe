import { FormProvider } from "@/components/atoms/form";
import SKGeneralForm from "@/components/general/forms/SKGeneralForm";
import { useAnt } from "@/hooks";
import { IUserDetail } from "@/interfaces/services/user";
import {
  IUpdateProfileBody,
  useUpdateAuthProfile,
} from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { updateProfileSchema } from "../schemas/profile.schema";

interface ProfileUpdateModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  data: IUserDetail | null;
}

const ProfileUpdateModal = ({
  open,
  onCancel,
  onSuccess,
  data,
}: ProfileUpdateModalProps) => {
  const { message } = useAnt();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateAuthProfile();

  const formMethods = useForm<IUpdateProfileBody>({
    resolver: yupResolver(updateProfileSchema),
    values: {
      name: data?.name || "",
      nik: data?.nik || "",
      gender: data?.gender || "",
      born_birth: data?.born_birth || "",
      born_place: data?.born_place || "",
      religion: data?.religion || "",
      marital_status: data?.marital_status || "",
      work: data?.work || "",
      address: data?.address || "",
    },
  });

  const handleSubmit = async (formData: IUpdateProfileBody) => {
    await updateProfile(formData)
      .then((res) => {
        if (res.success) {
          message.success("Profile updated successfully");
          onSuccess();
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  const handleCancel = () => {
    formMethods.reset();
    onCancel();
  };

  return (
    <Modal
      title="Update Profile"
      open={open}
      onOk={formMethods.handleSubmit(handleSubmit)}
      onCancel={handleCancel}
      confirmLoading={isUpdating}
      destroyOnHidden
      okText="Update Profile"
      cancelText="Cancel"
    >
      <FormProvider formMethods={formMethods} onSubmit={handleSubmit}>
        <SKGeneralForm disabled={false} />
      </FormProvider>
    </Modal>
  );
};

export default ProfileUpdateModal;
