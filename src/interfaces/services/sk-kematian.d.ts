import { ISuratKeteranganDetailBase, ISuratKeteranganGeneral } from "./sk";
import { MaritalStatus } from "./sk-tidak-mampu";

interface ISkKematian {
  death_date: string;
  death_place: string;
  death_reason: string;
  death_name: string;
  death_born_birth: Date;
  death_born_place: string;
  death_nik: string;
  death_gender: string;
  death_religion: string;
  death_address: string;
  death_work: string;
  death_marital_status: MaritalStatus;
  death_reporter_relation: string;
}

interface ISkKematianDetail extends ISuratKeteranganDetailBase, ISkKematian {}

interface ISkKematianCreate extends ISuratKeteranganGeneral, ISkKematian {}

export { ISkKematian, ISkKematianCreate, ISkKematianDetail };
