import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKBedaNamaDescriptionsProps {
  data: ISuratKeterangan;
}

const SKBedaNamaDescriptions = ({ data }: ISKBedaNamaDescriptionsProps) => {
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

  const itemsBedaNama = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_beda_nama?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: data?.sk_beda_nama?.address,
    },
    {
      key: "false_document",
      label: "Dokumen yang Salah",
      children: data?.sk_beda_nama?.false_document,
    },
  ];

  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Descriptions
        title="Data Pengajuan"
        layout="vertical"
        items={itemsPengaju}
        bordered
        column={2}
      />
      <Descriptions
        title="Data Beda Nama"
        layout="vertical"
        items={itemsBedaNama}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKBedaNamaDescriptions;
