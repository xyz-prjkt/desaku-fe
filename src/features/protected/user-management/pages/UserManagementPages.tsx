import { ContentPaper } from "@/components/atoms/paper";
import UserTable from "../components/UserTable";

const UserManagementPages = () => {
  return (
    <ContentPaper title="User Management">
      <UserTable />
    </ContentPaper>
  );
};

export default UserManagementPages;
