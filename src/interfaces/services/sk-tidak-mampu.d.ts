import { Gender } from "./gender";

type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";

interface ISkTidakMampu {
  id: string;
  name: string;
  address: string;
  reason: string;
}

interface ISkTidakMampuDetail extends ISkTidakMampu {
  born_birth: string;
  born_place: string;
  nik: string;
  gender: Gender;
  religion: string;
  work: string;
  marital_status: MaritalStatus;
  createdAt: string;
  updatedAt: string;
  user_sk_id: string;
}

interface ISkTidakMampuCreate {
  name: string;
  born_birth: string;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  reason: string;
  work: string;
  marital_status: MaritalStatus;
}

export {
  ISkTidakMampu,
  ISkTidakMampuDetail,
  ISkTidakMampuCreate,
  MaritalStatus,
};
