import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkBedaNama } from "@/interfaces/services/sk-beda-nama";
import { ISkDispensasi } from "@/interfaces/services/sk-dispensasi";
import { ISkDomisili } from "@/interfaces/services/sk-domisili";
import { ISkKehilangan } from "@/interfaces/services/sk-kehilangan";
import { ISkKelahiran } from "@/interfaces/services/sk-kelahiran";
import { ISkKematianDetail } from "@/interfaces/services/sk-kematian";
import { ISkKtpSementara } from "@/interfaces/services/sk-ktp-sementara";
import { ISkTidakMampuDetail } from "@/interfaces/services/sk-tidak-mampu";
import { SkType } from "@/interfaces/services/sk-type";
import { ISkUsaha } from "@/interfaces/services/sk-usaha";

export const SK_TYPE_MAP: Record<SkType, string> = {
  TIDAK_MAMPU: "SK Tidak Mampu",
  KEMATIAN: "SK Kematian",
  BEDA_NAMA: "SK Beda Nama",
  KELAHIRAN: "SK Kelahiran",
  DOMISILI: "SK Domisili",
  KEHILANGAN: "SK Kehilangan",
  DISPENSASI: "SK Dispensasi",
  KTP_SEMENTARA: "SK KTP Sementara",
  USAHA: "SK Usaha",
} as const;

export const SK_TYPE_TO_PROPERTY_MAP: Record<SkType, keyof ISuratKeterangan> = {
  KEMATIAN: "sk_kematian",
  TIDAK_MAMPU: "sk_tidak_mampu",
  KELAHIRAN: "sk_kelahiran",
  BEDA_NAMA: "sk_beda_nama",
  DISPENSASI: "sk_dispensasi",
  DOMISILI: "sk_domisili",
  KEHILANGAN: "sk_kehilangan",
  KTP_SEMENTARA: "sk_ktp_sementara",
  USAHA: "sk_usaha",
};

export type SkObjectType =
  | ISkKematianDetail
  | ISkTidakMampuDetail
  | ISkKelahiran
  | ISkBedaNama
  | ISkDispensasi
  | ISkDomisili
  | ISkKehilangan
  | ISkKtpSementara
  | ISkUsaha;

export const getSkObject = (record: ISuratKeterangan): SkObjectType | null => {
  const propertyKey = SK_TYPE_TO_PROPERTY_MAP[record.sk_type];
  const skObject = record[propertyKey] as SkObjectType;
  return skObject || null;
};
