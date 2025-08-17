import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";
import { ISuratKeteranganGeneral, ISuratKeteranganDetailBase } from "./sk";

interface ISkKehilangan {
  lost_object: string;
  lost_place: string;
}

interface ISkKehilanganDetail
  extends ISuratKeteranganDetailBase,
    ISkKehilangan {}

interface ISkKehilanganCreate extends ISuratKeteranganGeneral, ISkKehilangan {}

export { ISkKehilangan, ISkKehilanganDetail, ISkKehilanganCreate };
