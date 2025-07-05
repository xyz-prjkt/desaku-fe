import { SkType } from "./sk-type";
import { ISkKematian } from "./sk-kematian";
import { ISkTidakMampu } from "./sk-tidak-mampu";
import { IUserApprover } from "./user";

interface IDashboardResponse {
  verify: number;
  approved: number;
  rejected: number;
  revised: number;
}

interface IUserSk {
  id: string;
  user_id: string;
  sk_type: SkType;
  createdAt: string;
  updatedAt: string;
  user_approvers: IUserApprover[];
  sk_kematian: ISkKematian | null;
  sk_tidak_mampu: ISkTidakMampu | null;
}

export { IDashboardResponse, IUserSk };
