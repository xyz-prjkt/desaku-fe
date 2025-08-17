import { ISuratKeteranganDetailBase, ISuratKeteranganGeneral } from "./sk";

interface ISkKematian {
  death_date: string;
  death_place: string;
  death_reason: string;
}

interface ISkKematianDetail extends ISuratKeteranganDetailBase, ISkKematian {}

interface ISkKematianCreate extends ISuratKeteranganGeneral, ISkKematian {}

export { ISkKematian, ISkKematianCreate, ISkKematianDetail };
