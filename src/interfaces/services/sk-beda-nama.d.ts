import { Gender } from "./gender";
import { MaritalStatus } from "./sk-tidak-mampu";
import { ISuratKeteranganGeneral, ISuratKeteranganDetailBase } from "./sk";

interface ISkBedaNama {
  no_kk: string;
  false_document: string;
}

interface ISkBedaNamaDetail extends ISuratKeteranganDetailBase, ISkBedaNama {}

interface ISkBedaNamaCreate extends ISuratKeteranganGeneral, ISkBedaNama {}

export { ISkBedaNama, ISkBedaNamaDetail, ISkBedaNamaCreate };
