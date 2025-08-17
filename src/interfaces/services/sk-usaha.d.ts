import { ISuratKeteranganDetailBase, ISuratKeteranganGeneral } from "./sk";

interface ISkUsaha {
  bussiness: string;
  reason: string;
}

interface ISkUsahaDetail extends ISuratKeteranganDetailBase, ISkUsaha {}

interface ISkUsahaCreate extends ISuratKeteranganGeneral, ISkUsaha {}

export { ISkUsaha, ISkUsahaCreate, ISkUsahaDetail };
