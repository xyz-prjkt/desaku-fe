import { BaseTable } from "@/components/molecules/table";
import { useDialog, useTableAsync, useAnt } from "@/hooks";
import { IUser } from "@/interfaces/services/user";
import { useGetAllUsers } from "@/services/user.service";
import { Button, Popover, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditIcon, UserIcon } from "lucide-react";
import { EditUserModal } from "./index";

const UserTable = () => {
  const { message } = useAnt();
  const { paginateRequest, handlePageChange, handleSearchChange } =
    useTableAsync({
      initialSort: "DESC",
      initialOrderBy: "createdAt",
    });

  const { data: usersData, isLoading } = useGetAllUsers(paginateRequest);
  const editUserModal = useDialog<string>();

  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <span className="text-gray-600">{email}</span>,
    },
    {
      title: "NIK",
      dataIndex: "nik",
      key: "nik",
      render: (nik: string) => nik || "-",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => {
        if (!gender) return "-";
        return <Tag color={gender === "MALE" ? "blue" : "pink"}>{gender}</Tag>;
      },
    },
    {
      title: "Work",
      dataIndex: "work",
      key: "work",
      render: (work: string) => work || "-",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popover content={<span>Edit User</span>}>
            <Button
              type="text"
              icon={<EditIcon color="blue" size={18} />}
              onClick={() => editUserModal.handleClickOpen(record.id)}
              title="Edit User"
            />
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <BaseTable<IUser>
        columns={columns}
        data={usersData?.data || []}
        actionComponent={
          <Button type="primary" icon={<UserIcon size={16} />} disabled>
            Manage Users
          </Button>
        }
        isLoading={isLoading}
        withSearch
        onSearchChange={handleSearchChange}
        withQuickPageJumper
        total={usersData?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[10, 25, 50, 100]}
      />

      {editUserModal.open && editUserModal.data && (
        <EditUserModal
          userId={editUserModal.data}
          open={editUserModal.open}
          onCancel={editUserModal.handleClose}
          onSuccess={editUserModal.handleClose}
        />
      )}
    </div>
  );
};

export default UserTable;
