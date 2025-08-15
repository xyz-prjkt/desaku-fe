import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKDomisiliDescriptionsProps {
  data: ISuratKeterangan;
}

const SKDomisiliDescriptions = ({ data }: ISKDomisiliDescriptionsProps) => {
  const itemsDomisili = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_domisili?.name,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.sk_domisili?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.sk_domisili?.gender && (
        <GenderLabel gender={data?.sk_domisili?.gender} />
      ),
    },
    {
      key: "born_place",
      label: "Tempat Lahir",
      children: data?.sk_domisili?.born_place,
    },
    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.sk_domisili?.born_birth &&
        format(new Date(data?.sk_domisili?.born_birth), "EEEE, dd MMMM yyyy"),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.sk_domisili?.religion,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan",
      children: data?.sk_domisili?.marital_status && (
        <MaritalStatusLabel status={data?.sk_domisili?.marital_status} />
      ),
    },
    {
      key: "address",
      label: "Alamat",
      span: 3,
      children: data?.sk_domisili?.address,
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
        items={itemsDomisili}
        bordered
        column={2}
      />
    </Space>
  );
};
export default SKDomisiliDescriptions;
