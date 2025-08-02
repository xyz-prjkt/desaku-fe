import { DatePicker } from "@/components/atoms/date-picker";
import { FormProvider } from "@/components/atoms/form";
import { FormInputArea } from "@/components/atoms/input";
import FormInput from "@/components/atoms/input/FormInput";
import { SelectInput } from "@/components/atoms/select";
import { useAnt } from "@/hooks";
import { IUpdateUserBody } from "@/interfaces/services/user";
import {
  useGetAllPermissions,
  useGetAllRoles,
} from "@/services/role-permission.service";
import { useGetUserDetail, useUpdateUser } from "@/services/user.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Modal, Row, Typography } from "antd";
import { useForm } from "react-hook-form";
import { updateUserSchema } from "../schemas/user";

const { Text } = Typography;

interface EditUserModalProps {
  userId: string;
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const EditUserModal = ({
  userId,
  open,
  onCancel,
  onSuccess,
}: EditUserModalProps) => {
  const { message } = useAnt();
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();
  const { data: userDetailData, isLoading: isLoadingUserDetail } =
    useGetUserDetail(userId);
  const { data: rolesData } = useGetAllRoles({
    page: 1,
    limit: 100,
  });
  const { data: permissionsData } = useGetAllPermissions({
    page: 1,
    limit: 100,
  });

  const formMethods = useForm<IUpdateUserBody>({
    values: {
      name: userDetailData?.data?.name,
      email: userDetailData?.data?.email,
      born_birth: userDetailData?.data?.born_birth,
      born_place: userDetailData?.data?.born_place,
      gender: userDetailData?.data?.gender,
      work: userDetailData?.data?.work,
      marital_status: userDetailData?.data?.marital_status,
      nik: userDetailData?.data?.nik,
      religion: userDetailData?.data?.religion,
      address: userDetailData?.data?.address,
      roleIds: userDetailData?.data?.user_roles?.map((ur) => ur.role.id),
      permissionIds: userDetailData?.data?.user_permissions?.map(
        (up) => up.permission.id,
      ),
    },
    resolver: yupResolver(updateUserSchema),
  });

  const handleSubmit = async (data: IUpdateUserBody) => {
    await updateUser({
      id: userId,
      data,
    })
      .then((res) => {
        if (res.success) {
          message.success("User updated successfully");
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
      loading={isLoadingUserDetail}
      title={`Edit User: ${userDetailData?.data?.name}`}
      open={open}
      onOk={formMethods.handleSubmit(handleSubmit)}
      onCancel={handleCancel}
      confirmLoading={isUpdating}
    >
      <FormProvider formMethods={formMethods} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Row gutter={16}>
            <Col span={12}>
              <FormInput
                isRequired
                name="name"
                label="Name"
                placeholder="Enter full name"
              />
            </Col>
            <Col span={12}>
              <FormInput
                isRequired
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email address"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormInput
                isRequired
                name="nik"
                label="NIK"
                placeholder="Enter 16-digit NIK"
                maxLength={16}
              />
            </Col>
            <Col span={12}>
              <SelectInput
                isRequired
                name="gender"
                label="Gender"
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                ]}
                placeholder="Select gender"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DatePicker
                isRequired
                fullWidth
                name="born_birth"
                label="Date of Birth"
              />
            </Col>
            <Col span={12}>
              <FormInput
                isRequired
                name="born_place"
                label="Place of Birth"
                placeholder="Enter place of birth"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormInput
                isRequired
                name="work"
                label="Occupation"
                placeholder="Enter occupation"
              />
            </Col>
            <Col span={12}>
              <SelectInput
                isRequired
                name="marital_status"
                label="Marital Status"
                options={[
                  { label: "Single", value: "SINGLE" },
                  { label: "Married", value: "MARRIED" },
                  { label: "Divorced", value: "DIVORCED" },
                  { label: "Widowed", value: "WIDOWED" },
                  { label: "Separated", value: "SEPARATED" },
                  { label: "Siri", value: "SIRI" },
                ]}
                placeholder="Select marital status"
              />
            </Col>
          </Row>

          <FormInput
            isRequired
            name="religion"
            label="Religion"
            placeholder="Enter religion"
          />

          <FormInputArea
            isRequired
            name="address"
            label="Address"
            placeholder="Enter full address"
            rows={3}
          />

          <Row gutter={16}>
            <Col span={12}>
              <SelectInput
                isRequired
                name="roleIds"
                label="Roles"
                options={
                  rolesData?.data?.map((role) => ({
                    label: role.name,
                    value: role.id,
                  })) || []
                }
                placeholder="Select roles"
                mode="multiple"
              />
              <Text type="secondary" className="text-xs">
                Roles grant collections of permissions to the user
              </Text>
            </Col>
            <Col span={12}>
              <SelectInput
                isRequired
                name="permissionIds"
                label="Direct Permissions"
                options={
                  permissionsData?.data?.map((permission) => ({
                    label: permission.name,
                    value: permission.id,
                  })) || []
                }
                placeholder="Select permissions"
                mode="multiple"
              />
              <Text type="secondary" className="text-xs">
                Additional permissions granted directly to this user
              </Text>
            </Col>
          </Row>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default EditUserModal;
