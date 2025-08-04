import { IUserApprover } from "./user";

interface ISuratKeterangan {
  id: string;
  user_id: string;
  sk_type: SkType;
  createdAt: string;
  updatedAt: string;
  user_approvers: IUserApprover[];
  sk_kematian: ISkKematianDetail | null;
  sk_tidak_mampu: ISkTidakMampu | null;
}

export { ISuratKeterangan };
