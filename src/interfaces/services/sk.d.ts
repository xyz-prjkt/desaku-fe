import { ISkBedaNama } from "./sk-beda-nama";
import { ISkDispensasi } from "./sk-dispensasi";
import { ISkDomisili } from "./sk-domisili";
import { ISkKehilangan } from "./sk-kehilangan";
import { ISkKelahiran } from "./sk-kelahiran";
import { ISkKematianDetail } from "./sk-kematian";
import { ISkKtpSementara } from "./sk-ktp-sementara";
import { ISkTidakMampuDetail } from "./sk-tidak-mampu";
import { SkType } from "./sk-type";
import { ISkUsaha } from "./sk-usaha";
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
  sk_kelahiran: ISkKelahiran | null;
  sk_beda_nama: ISkBedaNama | null;
  sk_dispensasi: ISkDispensasi | null;
  sk_domisili: ISkDomisili | null;
  sk_kehilangan: ISkKehilangan | null;
  sk_kehilangan: ISkKehilangan | null;
  sk_ktp_sementara: ISkKtpSementara | null;
  sk_usaha: ISkUsaha | null;
}

export { ISuratKeterangan };
