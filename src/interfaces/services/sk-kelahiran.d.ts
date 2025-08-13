import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";

interface ISkKelahiran {
  id: string;
  name: string;
  address: string;
  father_name: string;
  mother_name: string;
}

interface ISkKelahiranDetail extends ISkKelahiran {
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

interface ISkKelahiranCreate {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  father_name: string;
  mother_name: string;
}

export { ISkKelahiran, ISkKelahiranDetail, ISkKelahiranCreate };
