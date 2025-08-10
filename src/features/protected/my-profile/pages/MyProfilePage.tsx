import { ContentPaper } from "@/components/atoms/paper";
import { useDialog } from "@/hooks/useDialog";
import { IUserDetail } from "@/interfaces/services/user";
import { useGetAuthMeProfile } from "@/services/auth.service";
import { Space } from "antd";
import ProfileActions from "../components/ProfileActions";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInformation from "../components/ProfileInformation";
import ProfileUpdateModal from "../components/ProfileUpdateModal";
import ProfileCompletionView from "@/components/general/views/ProfileCompletionView";

const MyProfilePage = () => {
  const {
    data: userProfile,
    isLoading: userProfileIsLoading,
    refetch,
  } = useGetAuthMeProfile();

  const {
    handleClickOpen: handleOpenUpdateModal,
    handleClose: handleCloseUpdateModal,
    open: updateModalOpen,
    data: selectedProfileData,
  } = useDialog<IUserDetail>();

  const handleEditProfile = () => {
    if (userProfile?.data) {
      handleOpenUpdateModal(userProfile.data);
    }
  };

  const handleUpdateSuccess = () => {
    handleCloseUpdateModal();
    refetch();
  };

  return (
    <>
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

      <ProfileUpdateModal
        open={updateModalOpen}
        onCancel={handleCloseUpdateModal}
        onSuccess={handleUpdateSuccess}
        data={selectedProfileData}
      />
    </>
  );
};

export default MyProfilePage;
