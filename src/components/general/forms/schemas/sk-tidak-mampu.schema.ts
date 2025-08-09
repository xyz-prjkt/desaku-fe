import * as yup from "yup";

const skTidakMampuSchema = yup.object({
  name: yup.string().required("Nama wajib diisi"),
  born_birth: yup.string().required("Tanggal lahir wajib diisi"),
  born_place: yup.string().required("Tempat lahir wajib diisi"),
  gender: yup
    .string()
    .oneOf(["MALE", "FEMALE"])
    .required("Jenis kelamin wajib diisi"),
  nik: yup.string().min(16).max(16).required("NIK wajib diisi"),
  religion: yup.string().required("Agama wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  reason: yup.string().required("Alasan wajib diisi"),
  work: yup.string().required("Pekerjaan wajib diisi"),
  marital_status: yup
    .string()
    .oneOf(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"])
    .required("Status pernikahan wajib diisi"),
});

export default skTidakMampuSchema;
