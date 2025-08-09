import { SkType } from "./sk-type";
import { IUserRole } from "./user";

interface ISKApproverSettings {
  id: string;
  sk_type: SkType;
  user_approver_id: string;
  is_active: boolean;
  order_priority: number;
  createdAt: string;
  updatedAt: string | null;
  approver: {
    id: string;
    name: string;
    email: string;
    user_roles: IUserRole[];
  };
}

interface ISKApproverSettingsResponse {
  [key in SkType]: ISKApproverSettings[];
}

interface ISKApproverSettingsBody {
  sk_type: SkType;
  approvers: {
    user_approver_id?: string;
    is_active?: boolean;
    order_priority?: number;
  }[];
}

export {
  ISKApproverSettings,
  ISKApproverSettingsBody,
  ISKApproverSettingsResponse,
};
