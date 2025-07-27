import { ContentPaper } from "@/components/atoms/paper";
import RoleTable from "../components/RoleTable";

const RoleManagementPages = () => {
  return (
    <ContentPaper title="Role & Permission Management">
      <RoleTable />
    </ContentPaper>
  );
};

export default RoleManagementPages;
