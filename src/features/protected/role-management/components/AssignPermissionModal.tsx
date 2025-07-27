import { CascaderInput } from "@/components/atoms/cascader";
import { FormProvider } from "@/components/atoms/form";
import {
  IAssignRolePermissionBody,
  IPermissionResponse,
} from "@/interfaces/services/role-permission";
import {
  useAssignRolePermission,
  useGetAllPermissions,
  useGetRoleDetail,
} from "@/services/role-permission.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Cascader } from "antd";
import { useForm } from "react-hook-form";
import { assignRolePermissionSchema } from "../schemas/role";
import { useAnt } from "@/hooks";
import { useEffect } from "react";

interface AssignPermissionModalProps {
  roleId: string;
  open: boolean;
  onCancel: () => void;
}

const AssignPermissionModal = ({
  roleId,
  open,
  onCancel,
}: AssignPermissionModalProps) => {
  const { data: permissionsData } = useGetAllPermissions({
    page: 1,
    limit: 100,
  });
  const { data: roleDetailData, isLoading: isLoadingRoleDetail } =
    useGetRoleDetail(roleId);
  const { mutateAsync: assignRolePermission, isPending: isAssigning } =
    useAssignRolePermission();

  const { message } = useAnt();
  const formMethods = useForm<IAssignRolePermissionBody>({
    resolver: yupResolver(assignRolePermissionSchema),
    defaultValues: {
      roleId,
      permissionIds: [],
    },
  });

  useEffect(() => {
    if (roleDetailData?.data?.permissions) {
      const currentPermissionIds = roleDetailData.data.permissions.map(
        (rp) => rp.permission.id
      );
      formMethods.setValue("permissionIds", currentPermissionIds);
    }
  }, [roleDetailData, formMethods]);

  const handleCascaderChange = (value: (string | number)[][]) => {
    const flattenedValues = value.map((item) => String(item[0]));
    formMethods.setValue("permissionIds", flattenedValues);
  };

  const cascaderValue = (formMethods.watch("permissionIds") || []).map(
    (id: string) => [id]
  );

  const handleSubmit = async (data: IAssignRolePermissionBody) => {
    await assignRolePermission({
      roleId: roleId,
      permissionIds: data.permissionIds,
    })
      .then((res) => {
        if (res.success) {
          message.success("Permissions assigned successfully");
          onCancel();
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <Modal
      loading={isLoadingRoleDetail}
      title={`Assign Permissions to ${roleDetailData?.data?.name}`}
      open={open}
      onOk={formMethods.handleSubmit((data) =>
        handleSubmit({
          roleId: data.roleId,
          permissionIds: data.permissionIds || [],
        })
      )}
      onCancel={onCancel}
      confirmLoading={isAssigning}
      width={600}
    >
      <FormProvider formMethods={formMethods} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <div className="text-xs mb-2">
              <span className="text-red-500">* </span>
              Select Permissions
            </div>
            <Cascader.Panel
              className="w-full"
              options={permissionsData?.data.map(
                (permission: IPermissionResponse) => ({
                  value: permission.id,
                  label: permission.name,
                })
              )}
              onChange={handleCascaderChange}
              value={cascaderValue}
              multiple
              showCheckedStrategy="SHOW_CHILD"
            />
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default AssignPermissionModal;
