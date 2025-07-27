import { Modal, Row, Col, Divider, Typography, Tag, Space } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IUpdateUserBody } from "@/interfaces/services/user";
import { FormProvider } from "@/components/atoms/form";
import FormInput from "@/components/atoms/input/FormInput";
import { FormInputArea } from "@/components/atoms/input";
import { SelectInput } from "@/components/atoms/select";
import { useAnt } from "@/hooks";
import { useUpdateUser, useGetUserDetail } from "@/services/user.service";
import {
  useGetAllRoles,
  useGetAllPermissions,
} from "@/services/role-permission.service";

const { Title, Text } = Typography;

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
    defaultValues: {
      name: "",
      email: "",
      born_birth: "",
      born_place: "",
      gender: undefined,
      work: "",
      marital_status: undefined,
      nik: "",
      religion: "",
      address: "",
      roleIds: [],
      permissionIds: [],
    },
  });

  useEffect(() => {
    if (open && userDetailData?.data) {
      const userData = userDetailData.data;
      formMethods.setValue("name", userData.name || "");
      formMethods.setValue("email", userData.email || "");
      formMethods.setValue(
        "born_birth",
        userData.born_birth ? userData.born_birth.split("T")[0] : ""
      );
      formMethods.setValue("born_place", userData.born_place || "");
      formMethods.setValue("gender", userData.gender);
      formMethods.setValue("work", userData.work || "");
      formMethods.setValue("marital_status", userData.marital_status);
      formMethods.setValue("nik", userData.nik || "");
      formMethods.setValue("religion", userData.religion || "");
      formMethods.setValue("address", userData.address || "");
      formMethods.setValue(
        "roleIds",
        userData.user_roles?.map((ur) => ur.role.id) || []
      );
      formMethods.setValue(
        "permissionIds",
        userData.user_permissions?.map((up) => up.permission.id) || []
      );
    }
  }, [open, userDetailData, formMethods]);

  const handleSubmit = async (data: IUpdateUserBody) => {
    try {
      // Remove empty strings and convert born_birth to ISO string if provided
      const cleanedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          if (key === "born_birth" && value) {
            // Handle date conversion properly
            const dateValue =
              typeof value === "string" ? value : value.toString();
            acc[key] = new Date(dateValue).toISOString();
          } else if (Array.isArray(value) && value.length > 0) {
            // Only include arrays with content
            acc[key] = value;
          } else if (!Array.isArray(value)) {
            // Include non-array values that are not empty
            acc[key] = value;
          }
        }
        return acc;
      }, {} as any);

      await updateUser({
        id: userId,
        data: cleanedData,
      });
      message.success("User updated successfully");
      onSuccess();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to update user");
      }
    }
  };

  const handleCancel = () => {
    formMethods.reset();
    onCancel();
  };

  const roleOptions =
    rolesData?.data?.map((role) => ({
      label: role.name,
      value: role.id,
    })) || [];

  const permissionOptions =
    permissionsData?.data?.map((permission) => ({
      label: permission.name,
      value: permission.id,
    })) || [];

  const genderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
  ];

  const maritalStatusOptions = [
    { label: "Single", value: "SINGLE" },
    { label: "Married", value: "MARRIED" },
    { label: "Divorced", value: "DIVORCED" },
    { label: "Widowed", value: "WIDOWED" },
    { label: "Separated", value: "SEPARATED" },
    { label: "Siri", value: "SIRI" },
  ];

  return (
    <Modal
      loading={isLoadingUserDetail}
      title={`Edit User: ${userDetailData?.data?.name || "Loading..."}`}
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
                name="name"
                label="Name"
                placeholder="Enter full name"
              />
            </Col>
            <Col span={12}>
              <FormInput
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
                name="nik"
                label="NIK"
                placeholder="Enter 16-digit NIK"
                maxLength={16}
              />
            </Col>
            <Col span={12}>
              <SelectInput
                name="gender"
                label="Gender"
                options={genderOptions}
                placeholder="Select gender"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormInput name="born_birth" label="Date of Birth" type="date" />
            </Col>
            <Col span={12}>
              <FormInput
                name="born_place"
                label="Place of Birth"
                placeholder="Enter place of birth"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormInput
                name="work"
                label="Occupation"
                placeholder="Enter occupation"
              />
            </Col>
            <Col span={12}>
              <SelectInput
                name="marital_status"
                label="Marital Status"
                options={maritalStatusOptions}
                placeholder="Select marital status"
              />
            </Col>
          </Row>

          <FormInput
            name="religion"
            label="Religion"
            placeholder="Enter religion"
          />

          <FormInputArea
            name="address"
            label="Address"
            placeholder="Enter full address"
            rows={3}
          />

          <Row gutter={16}>
            <Col span={12}>
              <SelectInput
                name="roleIds"
                label="Roles"
                options={roleOptions}
                placeholder="Select roles"
                mode="multiple"
              />
              <Text type="secondary" className="text-xs">
                Roles grant collections of permissions to the user
              </Text>
            </Col>
            <Col span={12}>
              <SelectInput
                name="permissionIds"
                label="Direct Permissions"
                options={permissionOptions}
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
