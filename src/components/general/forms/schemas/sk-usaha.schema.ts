import * as yup from "yup";

const skUsahaSchema = yup.object({
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
  marital_status: yup
    .string()
    .oneOf(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "SEPARATED", "SIRI"])
    .required("Status pernikahan wajib diisi"),
  bussiness: yup.string().required("Jenis usaha wajib diisi"),
  reason: yup.string().required("Alasan permohonan wajib diisi"),
});

export default skUsahaSchema;
