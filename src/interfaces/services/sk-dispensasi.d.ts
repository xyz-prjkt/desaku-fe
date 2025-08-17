import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";
import { ISuratKeteranganGeneral, ISuratKeteranganDetailBase } from "./sk";

interface ISkDispensasi {
  start_date: string;
  end_date: string;
  reason: string;
  purpose: string;
}

interface ISkDispensasiDetail
  extends ISuratKeteranganDetailBase,
    ISkDispensasi {
  start_date: string;
  end_date: string;
  reason: string;
  purpose: string;
}

interface ISkDispensasiCreate extends ISuratKeteranganGeneral, ISkDispensasi {}

export { ISkDispensasi, ISkDispensasiDetail, ISkDispensasiCreate };
