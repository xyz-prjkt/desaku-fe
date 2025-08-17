import { ISuratKeteranganDetailBase, ISuratKeteranganGeneral } from "./sk";

interface ISkKelahiran {
  father_name: string;
  mother_name: string;
}

interface ISkKelahiranDetail extends ISuratKeteranganDetailBase, ISkKelahiran {}

interface ISkKelahiranCreate extends ISuratKeteranganGeneral, ISkKelahiran {}

export { ISkKelahiran, ISkKelahiranCreate, ISkKelahiranDetail };
