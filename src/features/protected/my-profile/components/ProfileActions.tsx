import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface ProfileActionsProps {
  onEditProfile: () => void;
}

const ProfileActions = ({ onEditProfile }: ProfileActionsProps) => {
  return (
    <Button type="primary" icon={<EditOutlined />} onClick={onEditProfile}>
      Edit Profil
    </Button>
  );
};

export default ProfileActions;
