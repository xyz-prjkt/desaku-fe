import { SkType } from "./sk-type";
import { ApprovalStatus } from "./status";

interface ISkListUser {
  id: string;
  name: string;
  email: string;
  nik: string;
}

interface ISkListApprover {
  id: string;
  name: string;
  email: string;
}

interface ISkListUserApprover {
  id: string;
  user_sk_id: string;
  user_approver_id: string;
  status: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  approver: ISkListApprover;
}

interface ISkListKematian {
  id: string;
  name: string;
  nik: string;
  death_date: string;
}

interface ISkListTidakMampu {
  id: string;
  name: string;
  nik: string;
  reason: string;
}

interface ISkListItem {
  id: string;
  user_id: string;
  sk_type: SkType;
  createdAt: string;
  updatedAt: string;
  user: ISkListUser;
  user_approvers: ISkListUserApprover[];
  sk_kematian: ISkListKematian | null;
  sk_tidak_mampu: ISkListTidakMampu | null;
}

interface IUpdateSkStatusBody {
  status: ApprovalStatus;
}

export {
  ISkListItem,
  ISkListUser,
  ISkListApprover,
  ISkListUserApprover,
  ISkListKematian,
  ISkListTidakMampu,
  IUpdateSkStatusBody,
};
