import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";

interface ISkKtpSementara {
  id: string;
  name: string;
  address: string;
}

interface ISkKtpSementaraDetail extends ISkKtpSementara {
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

interface ISkKtpSementaraCreate {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
}

export { ISkKtpSementara, ISkKtpSementaraDetail, ISkKtpSementaraCreate };
