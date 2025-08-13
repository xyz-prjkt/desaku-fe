import { SkType } from "@/interfaces/services/sk-type";

export const SK_TYPE_MAP: Record<SkType, string> = {
  TIDAK_MAMPU: "Surat Keterangan Tidak Mampu",
  KEMATIAN: "Surat Keterangan Kematian",
  BEDA_NAMA: "Surat Keterangan Beda Nama",
  KELAHIRAN: "Surat Keterangan Kelahiran",
  DOMISILI: "Surat Keterangan Domisili",
  KEHILANGAN: "Surat Keterangan Kehilangan",
  DISPENSASI: "Surat Keterangan Dispensasi",
  KTP_SEMENTARA: "Surat Keterangan KTP Sementara",
  USAHA: "Surat Keterangan Usaha",
} as const;
