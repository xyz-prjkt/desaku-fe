import { FormProvider } from "@/components/atoms/form";
import FormInput from "@/components/atoms/input/FormInput";
import { useAnt } from "@/hooks";
import { IRoleBody } from "@/interfaces/services/role-permission";
import {
  useGetRoleDetail,
  useUpdateRole,
} from "@/services/role-permission.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { editRoleSchema } from "../schemas/role";

interface EditRoleModalProps {
  roleId: string;
  open: boolean;
  onCancel: () => void;
}

const EditRoleModal = ({ roleId, open, onCancel }: EditRoleModalProps) => {
  const { message } = useAnt();
  const { mutateAsync: updateRole, isPending: isUpdating } = useUpdateRole();
  const { data: roleDetailData, isLoading: isLoadingRoleDetail } =
    useGetRoleDetail(roleId);

  const formMethods = useForm<IRoleBody>({
    resolver: yupResolver(editRoleSchema),
    values: {
      name: roleDetailData?.data?.name,
    },
  });

  const handleSubmit = async (data: IRoleBody) => {
    await updateRole({
      id: roleId,
      data: { name: data.name },
    })
      .then((res) => {
        if (res.success) {
          message.success("Role updated successfully");
          onCancel();
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
      loading={isLoadingRoleDetail}
      title={`Edit Role: ${roleDetailData?.data?.name}`}
      open={open}
      onOk={formMethods.handleSubmit((data) =>
        handleSubmit({
          name: data.name,
        })
      )}
      onCancel={handleCancel}
      confirmLoading={isUpdating}
      width={500}
    >
      <FormProvider formMethods={formMethods} onSubmit={handleSubmit}>
        <FormInput
          name="name"
          label="Role Name"
          placeholder="Enter role name"
        />
      </FormProvider>
    </Modal>
  );
};

export default EditRoleModal;
