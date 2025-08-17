import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKKematianDescriptionsProps {
  data: ISuratKeterangan;
}

const SKKematianDescriptions = ({ data }: ISKKematianDescriptionsProps) => {
  const itemsPengaju = [
    {
      key: "createdAt",
      label: "Tanggal Pengajuan",
      children:
        data?.createdAt &&
        format(new Date(data?.createdAt), "EEEE, dd MMMM yyyy, HH:mm"),
    },
    {
      key: "name",
      label: "Nama Pelapor",
      children: data?.sk_kematian?.name,
    },
    {
      key: "nik",
      label: "NIK Pelapor",
      children: data?.sk_kematian?.nik,
    },
    {
      key: "born_place_birth",
      label: "Tempat/Tanggal Lahir Pelapor",
      children:
        data?.sk_kematian?.born_place &&
        data?.sk_kematian?.born_birth &&
        `${data?.sk_kematian?.born_place}, ${format(
          new Date(data?.sk_kematian?.born_birth),
          "dd MMMM yyyy"
        )}`,
    },
    {
      key: "gender",
      label: "Jenis Kelamin Pelapor",
      children: data?.sk_kematian?.gender && (
        <GenderLabel gender={data?.sk_kematian?.gender} />
      ),
    },
    {
      key: "religion",
      label: "Agama Pelapor",
      children: data?.sk_kematian?.religion,
    },
    {
      key: "work",
      label: "Pekerjaan Pelapor",
      children: data?.sk_kematian?.work,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan Pelapor",
      children: data?.sk_kematian?.marital_status && (
        <MaritalStatusLabel status={data?.sk_kematian?.marital_status} />
      ),
    },
    {
      key: "address",
      label: "Alamat Pelapor",
      children: data?.sk_kematian?.address,
    },
    {
      key: "death_reporter_relation",
      label: "Hubungan dengan Almarhum",
      children: data?.sk_kematian?.death_reporter_relation,
    },
    {
      key: "status",
      label: "Status",
      children: <ApprovalsTag approvers={data?.user_approvers} />,
    },
  ];

  const itemsKematian = [
    {
      key: "death_name",
      label: "Nama Almarhum",
      children: data?.sk_kematian?.death_name,
    },
    {
      key: "death_nik",
      label: "NIK Almarhum",
      children: data?.sk_kematian?.death_nik,
    },
    {
      key: "death_born_place_birth",
      label: "Tempat/Tanggal Lahir Almarhum",
      children:
        data?.sk_kematian?.death_born_place &&
        data?.sk_kematian?.death_born_birth &&
        `${data?.sk_kematian?.death_born_place}, ${format(
          new Date(data?.sk_kematian?.death_born_birth),
          "dd MMMM yyyy"
        )}`,
    },
    {
      key: "death_gender",
      label: "Jenis Kelamin Almarhum",
      children: data?.sk_kematian?.death_gender,
    },
    {
      key: "death_religion",
      label: "Agama Almarhum",
      children: data?.sk_kematian?.death_religion,
    },
    {
      key: "death_work",
      label: "Pekerjaan Almarhum",
      children: data?.sk_kematian?.death_work,
    },
    {
      key: "death_marital_status",
      label: "Status Pernikahan Almarhum",
      children: data?.sk_kematian?.death_marital_status && (
        <MaritalStatusLabel status={data?.sk_kematian?.death_marital_status} />
      ),
    },
    {
      key: "death_address",
      label: "Alamat Almarhum",
      children: data?.sk_kematian?.death_address,
    },
    {
      key: "death_date",
      label: "Tanggal Kematian",
      children:
        data?.sk_kematian?.death_date &&
        format(new Date(data?.sk_kematian?.death_date), "EEEE, dd MMMM yyyy"),
    },
    {
      key: "death_place",
      label: "Tempat Kematian",
      children: data?.sk_kematian?.death_place,
    },
    {
      key: "death_reason",
      label: "Penyebab Kematian",
      span: 3,
      children: data?.sk_kematian?.death_reason,
    },
  ];

  return (
    <Space className="w-full" direction="vertical" size={24}>
      <Descriptions
        size="small"
        title="Informasi Pelapor"
        layout="vertical"
        bordered
        items={itemsPengaju}
      />
      <Descriptions
        size="small"
        title="Informasi Almarhum"
        layout="vertical"
        bordered
        items={itemsKematian}
      />
    </Space>
  );
};

export default SKKematianDescriptions;
