import { ContentPaper } from "@/components/atoms/paper";
import { Tabs } from "antd";
import RoleTable from "../components/role/RoleTable";
import PermissionTable from "../components/permission/PermissionTable";

const RoleManagementPages = () => {
  const items = [
    {
      key: "role",
      label: "Role",
      children: <RoleTable />,
    },
    {
      key: "permission",
      label: "Permission",
      children: <PermissionTable />,
    },
  ];

  return (
    <ContentPaper title="Role & Permission Management">
      <Tabs items={items} />
    </ContentPaper>
  );
};

export default RoleManagementPages;
