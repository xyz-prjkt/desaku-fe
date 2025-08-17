import { ISuratKeteranganDetailBase, ISuratKeteranganGeneral } from "./sk";

interface ISkKtpSementaraDetail extends ISuratKeteranganDetailBase {}

interface ISkKtpSementaraCreate extends ISuratKeteranganGeneral {}

export { ISkKtpSementara, ISkKtpSementaraCreate, ISkKtpSementaraDetail };
