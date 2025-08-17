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
  death_name: yup.string().required("Nama almarhum wajib diisi"),
  death_born_birth: yup.date().required("Tanggal lahir almarhum wajib diisi"),
  death_born_place: yup.string().required("Tempat lahir almarhum wajib diisi"),
  death_nik: yup.string().min(16).max(16).required("NIK almarhum wajib diisi"),
  death_gender: yup.string().required("Jenis kelamin almarhum wajib diisi"),
  death_religion: yup.string().required("Agama almarhum wajib diisi"),
  death_address: yup.string().required("Alamat almarhum wajib diisi"),
  death_work: yup.string().required("Pekerjaan almarhum wajib diisi"),
  death_marital_status: yup
    .mixed<MaritalStatus>()
    .required("Status pernikahan almarhum wajib diisi"),
  death_reporter_relation: yup
    .string()
    .required("Hubungan pelapor dengan almarhum wajib diisi"),
});

export default skKematianSchema;
