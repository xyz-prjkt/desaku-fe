import { ApprovalStatus } from "./status";

interface IApprover {
  id: string;
  name: string;
}

interface IUserApprover {
  id: string;
  user_sk_id: string;
  user_approver_id: string;
  status: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  approver: IApprover;
}

export { IApprover, IUserApprover };
