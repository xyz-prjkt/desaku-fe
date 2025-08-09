import { FormProvider } from "@/components/atoms/form";
import FormInput from "@/components/atoms/input/FormInput";
import { useAnt } from "@/hooks";
import { useCreateRole } from "@/services/role-permission.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { createRoleSchema } from "../schemas/role";

interface CreateRoleModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

interface CreateRoleFormData {
  name: string;
}

const CreateRoleModal = ({
  open,
  onCancel,
  onSuccess,
}: CreateRoleModalProps) => {
  const { message } = useAnt();
  const { mutateAsync: createRole, isPending: isCreating } = useCreateRole();

  const formMethods = useForm<CreateRoleFormData>({
    resolver: yupResolver(createRoleSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: CreateRoleFormData) => {
    try {
      await createRole({
        name: data.name.trim(),
      });
      message.success("Role created successfully");
      formMethods.reset();
      onSuccess();
    } catch (error) {
      message.error("Failed to create role");
    }
  };

  const handleCancel = () => {
    formMethods.reset();
    onCancel();
  };

  return (
    <Modal
      title="Create New Role"
      open={open}
      onOk={formMethods.handleSubmit((data) =>
        handleSubmit({
          name: data.name,
        })
      )}
      onCancel={handleCancel}
      confirmLoading={isCreating}
      width={500}
      destroyOnClose
    >
      <FormProvider formMethods={formMethods} onSubmit={handleSubmit}>
        <FormInput
          name="name"
          label="Role Name"
          placeholder="Enter role name"
          required
        />
      </FormProvider>
    </Modal>
  );
};

export default CreateRoleModal;
