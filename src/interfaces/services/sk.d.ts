import { Gender } from "./gender";
import { ISkBedaNamaDetail } from "./sk-beda-nama";
import { ISkDispensasiDetail } from "./sk-dispensasi";
import { ISkDomisiliDetail } from "./sk-domisili";
import { ISkKehilanganDetail } from "./sk-kehilangan";
import { ISkKelahiranDetail } from "./sk-kelahiran";
import { ISkKematianDetail } from "./sk-kematian";
import { ISkKtpSementaraDetail } from "./sk-ktp-sementara";
import { ISkTidakMampuDetail, MaritalStatus } from "./sk-tidak-mampu";
import { SkType } from "./sk-type";
import { ISkUsahaDetail } from "./sk-usaha";
import { IUserApprover } from "./user";

interface ISuratKeterangan {
  id: string;
  user_id: string;
  sk_type: SkType;
  createdAt: string;
  updatedAt: string;
  user_approvers: IUserApprover[];
  sk_kematian: ISkKematianDetail | null;
  sk_tidak_mampu: ISkTidakMampuDetail | null;
  sk_kelahiran: ISkKelahiranDetail | null;
  sk_beda_nama: ISkBedaNamaDetail | null;
  sk_dispensasi: ISkDispensasiDetail | null;
  sk_domisili: ISkDomisiliDetail | null;
  sk_kehilangan: ISkKehilanganDetail | null;
  sk_ktp_sementara: ISkKtpSementaraDetail | null;
  sk_usaha: ISkUsahaDetail | null;
}

interface ISuratKeteranganGeneral {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  work: string;
  marital_status: MaritalStatus;
}

interface ISuratKeteranganDetailBase extends ISuratKeteranganGeneral {
  id: string;
  createdAt: string;
  updatedAt: string;
  user_sk_id: string;
}

export {
  ISuratKeterangan,
  ISuratKeteranganGeneral,
  ISuratKeteranganDetailBase,
};
