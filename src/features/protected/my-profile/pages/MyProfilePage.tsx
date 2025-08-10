import { ContentPaper } from "@/components/atoms/paper";
import { useGetAuthMeProfile } from "@/services/auth.service";
import { Space } from "antd";
import ProfileActions from "../components/ProfileActions";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInformation from "../components/ProfileInformation";
import RolePermissionInfo from "../components/RolePermissionInfo";

const MyProfilePage = () => {
  const { data: userProfile, isLoading: userProfileIsLoading } =
    useGetAuthMeProfile();

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  return (
    <ContentPaper
      title="Profil Saya"
      isLoading={userProfileIsLoading}
      action={
        userProfile?.data && (
          <ProfileActions onEditProfile={handleEditProfile} />
        )
      }
    >
      {userProfile?.data && (
        <Space direction="vertical" size="large" className="w-full">
          <ProfileHeader data={userProfile.data} />
          <ProfileInformation data={userProfile.data} />
        </Space>
      )}
    </ContentPaper>
  );
};

export default MyProfilePage;
