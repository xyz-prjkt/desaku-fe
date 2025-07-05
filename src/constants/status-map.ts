import { ApprovalStatus } from "@/interfaces/services/status";

export const STATUS_MAP: Record<ApprovalStatus, string> = {
  APPROVED: "Disetujui",
  REJECTED: "Ditolak",
  REVISED: "Direvisi",
  PENDING: "Menunggu Verifikasi",
} as const;
