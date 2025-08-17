import { ISuratKeteranganDetailBase, ISuratKeteranganGeneral } from "./sk";

type MaritalStatus =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED"
  | "SEPARATED"
  | "SIRI";

interface ISkTidakMampu {
  reason: string;
}

interface ISkTidakMampuDetail
  extends ISuratKeteranganDetailBase,
    ISkTidakMampu {}

interface ISkTidakMampuCreate extends ISuratKeteranganGeneral, ISkTidakMampu {}

export {
  ISkTidakMampu,
  ISkTidakMampuCreate,
  ISkTidakMampuDetail,
  MaritalStatus,
};
