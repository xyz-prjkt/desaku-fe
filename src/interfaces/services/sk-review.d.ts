import { ISuratKeterangan } from "./sk";
import { IUser } from "./user";

interface ISkReviewListResponse extends ISuratKeterangan {
  user: Pick<IUser, "id" | "name" | "email" | "nik">;
}

interface ISkReviewChangeStatusBody {
  status: string;
}

export { ISkReviewChangeStatusBody, ISkReviewListResponse };
