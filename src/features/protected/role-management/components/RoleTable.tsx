import { BaseTable } from "@/components/molecules/table";
import { useDialog, useTableAsync, useAnt } from "@/hooks";
import { IRoleResponse } from "@/interfaces/services/role-permission";
import {
  useGetAllRoles,
  useDeleteRole,
} from "@/services/role-permission.service";
import { Button, Modal, Popconfirm, Popover, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditIcon, ShieldIcon, TrashIcon, PlusIcon } from "lucide-react";
import AssignPermissionModal from "./AssignPermissionModal";
import EditRoleModal from "./EditRoleModal";
import CreateRoleModal from "./CreateRoleModal";

const RoleTable = () => {
  const { message } = useAnt();
  const { paginateRequest, handlePageChange, handleSearchChange } =
    useTableAsync({
      initialSort: "DESC",
      initialOrderBy: "created_at",
    });

  const { data: rolesData, isLoading } = useGetAllRoles(paginateRequest);
  const { mutateAsync: deleteRole, isPending: isDeleting } = useDeleteRole();

  const assignRolePermissionModal = useDialog<string>();
  const editRoleModal = useDialog<string>();
  const createRoleModal = useDialog();

  const handleDelete = (id: string) => {
    deleteRole(id)
      .then((res) => {
        if (res.success) {
          message.success("Role deleted successfully");
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  const columns: ColumnsType<IRoleResponse> = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popover content={<span>Assign Permissions</span>}>
            <Button
              type="text"
              icon={<ShieldIcon color="orange" size={18} />}
              onClick={() =>
                assignRolePermissionModal.handleClickOpen(record.id)
              }
              title="Assign Permissions"
            />
          </Popover>
          <Popover content={<span>Edit Role</span>}>
            <Button
              type="text"
              icon={<EditIcon color="blue" size={18} />}
              onClick={() => editRoleModal.handleClickOpen(record.id)}
              title="Edit Role"
            />
          </Popover>
          <Popover content={<span>Delete Role</span>}>
            <Popconfirm
              title="Are you sure you want to delete this role?"
              onConfirm={() => handleDelete(record.id)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ loading: isDeleting }}
            >
              <Button
                type="text"
                icon={<TrashIcon color="red" size={18} />}
                title="Delete Role"
              />
            </Popconfirm>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <BaseTable<IRoleResponse>
        columns={columns}
        data={rolesData?.data || []}
        actionComponent={
          <Button
            type="primary"
            icon={<PlusIcon size={16} />}
            onClick={createRoleModal.handleClickOpen}
          >
            Add Role
          </Button>
        }
        isLoading={isLoading}
        withSearch
        onSearchChange={handleSearchChange}
        withQuickPageJumper
        total={rolesData?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[10, 25, 50, 100]}
      />

      {assignRolePermissionModal.open && assignRolePermissionModal.data && (
        <AssignPermissionModal
          roleId={assignRolePermissionModal.data}
          open={assignRolePermissionModal.open}
          onCancel={assignRolePermissionModal.handleClose}
        />
      )}
      {editRoleModal.open && editRoleModal.data && (
        <EditRoleModal
          roleId={editRoleModal.data}
          open={editRoleModal.open}
          onCancel={editRoleModal.handleClose}
        />
      )}
      {createRoleModal.open && (
        <CreateRoleModal
          open={createRoleModal.open}
          onCancel={createRoleModal.handleClose}
          onSuccess={createRoleModal.handleClose}
        />
      )}
    </div>
  );
};

export default RoleTable;
