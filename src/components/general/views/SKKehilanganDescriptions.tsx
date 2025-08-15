import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKKehilanganDescriptionsProps {
  data: ISuratKeterangan;
}

const SKKehilanganDescriptions = ({ data }: ISKKehilanganDescriptionsProps) => {
  const itemsKehilangan = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_kehilangan?.name,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.sk_kehilangan?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.sk_kehilangan?.gender && (
        <GenderLabel gender={data?.sk_kehilangan?.gender} />
      ),
    },
    {
      key: "born_place",
      label: "Tempat Lahir",
      children: data?.sk_kehilangan?.born_place,
    },
    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.sk_kehilangan?.born_birth &&
        format(new Date(data?.sk_kehilangan?.born_birth), "EEEE, dd MMMM yyyy"),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.sk_kehilangan?.religion,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan",
      children: data?.sk_kehilangan?.marital_status && (
        <MaritalStatusLabel status={data?.sk_kehilangan?.marital_status} />
      ),
    },
    {
      key: "address",
      label: "Alamat",
      span: 3,
      children: data?.sk_kehilangan?.address,
    },
    {
      key: "lost_object",
      label: "Barang yang Hilang",
      span: 3,
      children: data?.sk_kehilangan?.lost_object,
    },
    {
      key: "lost_place",
      label: "Tempat Kehilangan",
      span: 3,
      children: data?.sk_kehilangan?.lost_place,
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
        items={itemsKehilangan}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKKehilanganDescriptions;
