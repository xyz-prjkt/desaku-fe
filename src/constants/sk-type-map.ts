import { SkType } from "@/interfaces/services/sk-type";

export const SK_TYPE_MAP: Record<SkType, string> = {
  TIDAK_MAMPU: "Surat Keterangan Tidak Mampu",
  KEMATIAN: "Surat Keterangan Kematian",
} as const;
