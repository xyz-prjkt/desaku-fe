import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKBedaNamaDescriptionsProps {
  data: ISuratKeterangan;
}

const SKBedaNamaDescriptions = ({ data }: ISKBedaNamaDescriptionsProps) => {
  const itemsBedaNama = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_beda_nama?.name,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.sk_beda_nama?.nik,
    },
    {
      key: "no_kk",
      label: "No. KK",
      children: data?.sk_beda_nama?.no_kk,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.sk_beda_nama?.gender && (
        <GenderLabel gender={data?.sk_beda_nama?.gender} />
      ),
    },
    {
      key: "born_place",
      label: "Tempat Lahir",
      children: data?.sk_beda_nama?.born_place,
    },
    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.sk_beda_nama?.born_birth &&
        format(new Date(data?.sk_beda_nama?.born_birth), "EEEE, dd MMMM yyyy"),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.sk_beda_nama?.religion,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan",
      children: data?.sk_beda_nama?.marital_status && (
        <MaritalStatusLabel status={data?.sk_beda_nama?.marital_status} />
      ),
    },
    {
      key: "address",
      label: "Alamat",
      span: 3,
      children: data?.sk_beda_nama?.address,
    },
    {
      key: "false_document",
      label: "Dokumen yang Salah",
      span: 3,
      children: data?.sk_beda_nama?.false_document,
    },
    {
      key: "status",
      label: "Status Pengajuan",
      children: <ApprovalsTag approvers={data?.user_approvers} />,
    },
    {
      key: "createdAt",
      label: "Tanggal Pengajuan",
      children:
        data?.createdAt &&
        format(new Date(data?.createdAt), "EEEE, dd MMMM yyyy, HH:mm"),
    },
  ];

  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Descriptions
        size="small"
        title="Informasi Pemohon"
        layout="vertical"
        items={itemsBedaNama}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKBedaNamaDescriptions;
