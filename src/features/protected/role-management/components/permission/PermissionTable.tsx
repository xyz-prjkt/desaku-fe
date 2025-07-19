import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

const PermissionTable = () => {
  // Mock data for demonstration
  const mockData: Permission[] = [
    {
      id: "1",
      name: "user:read",
      description: "Read user information",
      resource: "User",
      action: "read",
      status: "active",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      name: "user:write",
      description: "Create and update user information",
      resource: "User",
      action: "write",
      status: "active",
      createdAt: "2024-01-02",
      updatedAt: "2024-01-02",
    },
    {
      id: "3",
      name: "role:read",
      description: "Read role information",
      resource: "Role",
      action: "read",
      status: "active",
      createdAt: "2024-01-03",
      updatedAt: "2024-01-03",
    },
    {
      id: "4",
      name: "role:write",
      description: "Create and update role information",
      resource: "Role",
      action: "write",
      status: "active",
      createdAt: "2024-01-04",
      updatedAt: "2024-01-04",
    },
    {
      id: "5",
      name: "content:write",
      description: "Create and update content",
      resource: "Content",
      action: "write",
      status: "inactive",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-05",
    },
  ];

  const columns: ColumnsType<Permission> = [
    {
      title: "Permission Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => (
        <Tag color="purple">{name}</Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Resource",
      dataIndex: "resource",
      key: "resource",
      render: (resource: string) => (
        <Tag color="cyan">{resource}</Tag>
      ),
      filters: [
        { text: "User", value: "User" },
        { text: "Role", value: "Role" },
        { text: "Content", value: "Content" },
      ],
      onFilter: (value, record) => record.resource === value,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: string) => (
        <Tag color={action === "read" ? "blue" : "orange"}>
          {action.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Read", value: "read" },
        { text: "Write", value: "write" },
      ],
      onFilter: (value, record) => record.action === value,
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
    console.log("Edit permission:", id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log("Delete permission:", id);
    // TODO: Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new permission");
    // TODO: Implement add functionality
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Permission Management</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Permission
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

export default PermissionTable;
