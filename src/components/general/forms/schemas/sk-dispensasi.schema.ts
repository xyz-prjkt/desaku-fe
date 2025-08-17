import { Gender } from "@/interfaces/services/gender";
import { MaritalStatus } from "@/interfaces/services/sk-tidak-mampu";
import * as yup from "yup";

const skDispensasiSchema = yup.object({
  name: yup.string().required("Nama wajib diisi"),
  born_birth: yup.string().required("Tanggal lahir wajib diisi"),
  born_place: yup.string().required("Tempat lahir wajib diisi"),
  gender: yup.mixed<Gender>().required("Jenis kelamin wajib diisi"),
  nik: yup.string().min(16).max(16).required("NIK wajib diisi"),
  work: yup.string().required("Pekerjaan wajib diisi"),
  religion: yup.string().required("Agama wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  marital_status: yup
    .mixed<MaritalStatus>()
    .required("Status pernikahan wajib diisi"),
  start_date: yup.string().required("Tanggal mulai dispensasi wajib diisi"),
  end_date: yup.string().required("Tanggal akhir dispensasi wajib diisi"),
  reason: yup.string().required("Alasan dispensasi wajib diisi"),
  purpose: yup.string().required("Tujuan dispensasi wajib diisi"),
});

export default skDispensasiSchema;
