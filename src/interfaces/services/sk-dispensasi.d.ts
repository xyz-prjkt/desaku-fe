import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";

interface ISkDispensasi {
  id: string;
  name: string;
  address: string;
  start_date: string;
  end_date: string;
  reason: string;
  purpose: string;
}

interface ISkDispensasiDetail extends ISkDispensasi {
  born_birth: string;
  born_place: string;
  nik: string;
  gender: Gender;
  religion: string;
  marital_status: MaritalStatus;
  createdAt: string;
  updatedAt: string;
  user_sk_id: string;
}

interface ISkDispensasiCreate {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  start_date: string;
  end_date: string;
  reason: string;
  purpose: string;
}

export { ISkDispensasi, ISkDispensasiDetail, ISkDispensasiCreate };
