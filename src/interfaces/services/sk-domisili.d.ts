import { ISuratKeteranganDetailBase, ISuratKeteranganGeneral } from "./sk";

interface ISkDomisiliDetail extends ISuratKeteranganDetailBase {}

interface ISkDomisiliCreate extends ISuratKeteranganGeneral {}

export { ISkDomisili, ISkDomisiliCreate, ISkDomisiliDetail };
