import { ApprovalStatus } from "@/interfaces/services/status";

export const STATUS_COLOR_MAP: Record<ApprovalStatus, string> = {
  APPROVED: "green",
  REJECTED: "red",
  REVISED: "blue",
  VERIFY: "orange",
} as const;
