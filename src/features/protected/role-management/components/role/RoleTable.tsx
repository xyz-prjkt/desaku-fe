import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

const RoleTable = () => {
  // Mock data for demonstration
  const mockData: Role[] = [
    {
      id: "1",
      name: "Administrator",
      description: "Full system access",
      permissions: ["user:read", "user:write", "role:read", "role:write"],
      status: "active",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Editor",
      description: "Content management access",
      permissions: ["user:read", "content:write"],
      status: "active",
      createdAt: "2024-01-02",
      updatedAt: "2024-01-02",
    },
    {
      id: "3",
      name: "Viewer",
      description: "Read-only access",
      permissions: ["user:read"],
      status: "inactive",
      createdAt: "2024-01-03",
      updatedAt: "2024-01-03",
    },
  ];

  const columns: ColumnsType<Role> = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions.slice(0, 2).map((permission) => (
            <Tag key={permission} color="blue">
              {permission}
            </Tag>
          ))}
          {permissions.length > 2 && (
            <Tag color="default">+{permissions.length - 2} more</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (id: string) => {
    console.log("Edit role:", id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log("Delete role:", id);
    // TODO: Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new role");
    // TODO: Implement add functionality
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Role Management</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Role
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </div>
  );
};

export default RoleTable;
