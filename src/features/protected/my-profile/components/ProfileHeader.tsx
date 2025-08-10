import { AvatarImage } from "@/components/atoms/avatar";
import { Typography } from "@/components/atoms/typography";
import { IUserDetail } from "@/interfaces/services/user";
import { Card, Grid, Space, Tag } from "antd";
import { format } from "date-fns";

interface ProfileHeaderProps {
  data: IUserDetail;
}

const ProfileHeader = ({ data }: ProfileHeaderProps) => {
  const { xs } = Grid.useBreakpoint();
  return (
    <Card>
      <Space
        direction={xs ? "vertical" : "horizontal"}
        size="large"
        className="w-full"
      >
        <AvatarImage
          size={80}
          src={undefined}
          fallback={data?.name?.charAt(0)?.toUpperCase()}
        />
        <Space direction="vertical" size={0}>
          <Typography.P className="font-semibold text-xl">
            {data?.name}
          </Typography.P>
          <Typography.P>{data?.email}</Typography.P>
          <div className="flex flex-wrap gap-1 mt-2">
            {data?.user_roles?.map((userRole) => (
              <Tag key={userRole.id} color="blue">
                {userRole.role.name}
              </Tag>
            ))}
          </div>
        </Space>
      </Space>
    </Card>
  );
};

export default ProfileHeader;
