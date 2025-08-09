import { SkType } from "@/interfaces/services/sk-type";
import * as yup from "yup";

const skApprovalFlowSchema = yup
  .object({
    sk_type: yup
      .string()
      .required("SK Type is required") as yup.StringSchema<SkType>,
    approvers: yup
      .array()
      .of(
        yup
          .object({
            user_approver_id: yup.string().required(),
            is_active: yup.boolean().required(),
            order_priority: yup.number().required(),
          })
          .required()
      )
      .min(1, "At least one approver is required")
      .required("Approvers are required"),
  })
  .required();

export { skApprovalFlowSchema };
