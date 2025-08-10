import { useGetAuthProfileCheck } from "@/services/auth.service";
import { Alert, Button } from "antd";
import { ReactNode } from "react";
import { Link } from "react-router";

interface IProfileCompletionViewProps {
  children?: ReactNode;
  className?: string;
}

const ProfileCompletionView = ({
  children,
  className,
}: IProfileCompletionViewProps) => {
  const { data: profileCheck, isLoading: profileCheckIsLoading } =
    useGetAuthProfileCheck();

  if (profileCheck?.data?.isComplete || profileCheckIsLoading) {
    if (children) return children;
    return null;
  }

  return (
    <Alert
      className={className}
      message="Lengkapi Profil"
      description="Lengkapi profil akun pengguna kamu untuk dapat menggunakan sistem"
      type="info"
      action={
        <Link to="/my-profile">
          <Button color="blue" variant="solid">
            Lengkapi Profil
          </Button>
        </Link>
      }
      showIcon
    />
  );
};

export default ProfileCompletionView;
