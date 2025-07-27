import UserTable from "./components/UserTable";

const UserManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          User Management
        </h1>
      </div>

      <UserTable />
    </div>
  );
};

export default UserManagementPage;
