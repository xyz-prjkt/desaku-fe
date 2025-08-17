import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";

interface ISkBedaNama {
  id: string;
  name: string;
  address: string;
  false_document: string;
}

interface ISkBedaNamaDetail extends ISkBedaNama {
  born_birth: string;
  born_place: string;
  nik: string;
  no_kk: string;
  work: string;
  gender: Gender;
  religion: string;
  marital_status: MaritalStatus;
  createdAt: string;
  updatedAt: string;
  user_sk_id: string;
}

interface ISkBedaNamaCreate {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  work: string;
  no_kk: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  false_document: string;
}

export { ISkBedaNama, ISkBedaNamaDetail, ISkBedaNamaCreate };
