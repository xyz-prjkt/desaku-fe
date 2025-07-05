import { STATUS_COLOR_MAP } from "@/constants/status-color";
import { STATUS_MAP } from "@/constants/status-map";
import { IUserApprover } from "@/interfaces/services/user";
import { Tag } from "antd";

interface IApprovalsTagProps {
  approvers: IUserApprover[];
}

const ApprovalsTag = ({ approvers }: IApprovalsTagProps) => {
  if (approvers.length === 0) {
    return <Tag color="orange">Menunggu Verifikasi</Tag>;
  }

  return (
    <div className="flex flex-wrap flex-col gap-1">
      {approvers.map((approval, index) => (
        <Tag
          className="w-fit"
          key={index}
          color={STATUS_COLOR_MAP[approval.status] || "default"}
        >
          {approval.approver.name}:{" "}
          {STATUS_MAP[approval.status] || approval.status}
        </Tag>
      ))}
    </div>
  );
};

export default ApprovalsTag;
