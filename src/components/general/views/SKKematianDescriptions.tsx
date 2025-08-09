import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
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
      key: "status",
      label: "Status",
      children: <ApprovalsTag approvers={data?.user_approvers} />,
    },
  ];

  const itemsKematian = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_kematian?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: data?.sk_kematian?.address,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.sk_kematian?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.sk_kematian?.gender && (
        <GenderLabel gender={data?.sk_kematian?.gender} />
      ),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.sk_kematian?.religion,
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
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.sk_kematian?.born_birth &&
        format(new Date(data?.sk_kematian?.born_birth), "EEEE, dd MMMM yyyy"),
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
        title="Informasi Pengaju"
        layout="vertical"
        bordered
        items={itemsPengaju}
      />
      <Descriptions
        size="small"
        title="Informasi Mendiang"
        layout="vertical"
        bordered
        items={itemsKematian}
      />
    </Space>
  );
};

export default SKKematianDescriptions;
