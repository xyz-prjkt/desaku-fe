import { Gender } from "@/interfaces/services/gender";
import { MaritalStatus } from "@/interfaces/services/sk-tidak-mampu";
import * as yup from "yup";

const skKematianSchema = yup.object({
  name: yup.string().required("Nama wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  death_date: yup.string().required("Tanggal kematian wajib diisi"),
  born_birth: yup.string().required("Tanggal lahir wajib diisi"),
  born_place: yup.string().required("Tempat lahir wajib diisi"),
  work: yup.string().required("Pekerjaan wajib diisi"),
  marital_status: yup
    .mixed<MaritalStatus>()
    .required("Status pernikahan wajib diisi"),
  nik: yup.string().min(16).max(16).required("NIK wajib diisi"),
  gender: yup.mixed<Gender>().required("Jenis kelamin wajib diisi"),
  religion: yup.string().required("Agama wajib diisi"),
  death_place: yup.string().required("Tempat kematian wajib diisi"),
  death_reason: yup.string().required("Alasan kematian wajib diisi"),
});

export default skKematianSchema;
