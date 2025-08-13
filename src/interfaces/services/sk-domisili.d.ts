import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";

interface ISkDomisili {
  id: string;
  name: string;
  address: string;
}

interface ISkDomisiliDetail extends ISkDomisili {
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

interface ISkDomisiliCreate {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
}

export { ISkDomisili, ISkDomisiliDetail, ISkDomisiliCreate };
