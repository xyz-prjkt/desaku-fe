import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";

interface ISkKehilangan {
  id: string;
  name: string;
  address: string;
  lost_object: string;
  lost_place: string;
}

interface ISkKehilanganDetail extends ISkKehilangan {
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

interface ISkKehilanganCreate {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  lost_object: string;
  lost_place: string;
}

export { ISkKehilangan, ISkKehilanganDetail, ISkKehilanganCreate };
