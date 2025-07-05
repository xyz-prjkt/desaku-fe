interface ISkKematian {
  id: string;
  name: string;
  address: string;
  death_date: string;
}

interface ISkKematianDetail extends ISkKematian {
  born_birth: string;
  born_place: string;
  nik: string;
  gender: "MALE" | "FEMALE";
  religion: string;
  death_place: string;
  death_reason: string;
  createdAt: string;
  updatedAt: string;
  user_sk_id: string;
}

export { ISkKematian, ISkKematianDetail };
