import { Gender } from "@/interfaces/services/gender";
import { MaritalStatus } from "@/interfaces/services/sk-tidak-mampu";
import * as yup from "yup";

const skKehilanganSchema = yup.object({
  name: yup.string().required("Nama wajib diisi"),
  born_birth: yup.string().required("Tanggal lahir wajib diisi"),
  born_place: yup.string().required("Tempat lahir wajib diisi"),
  gender: yup.mixed<Gender>().required("Jenis kelamin wajib diisi"),
  work: yup.string().required("Pekerjaan wajib diisi"),
  nik: yup.string().min(16).max(16).required("NIK wajib diisi"),
  religion: yup.string().required("Agama wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  marital_status: yup
    .mixed<MaritalStatus>()
    .required("Status pernikahan wajib diisi"),
  lost_object: yup.string().required("Barang yang hilang wajib diisi"),
  lost_place: yup.string().required("Tempat kehilangan wajib diisi"),
});

export default skKehilanganSchema;
