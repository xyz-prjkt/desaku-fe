import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKUsahaDescriptionsProps {
  data: ISuratKeterangan;
}

const SKUsahaDescriptions = ({ data }: ISKUsahaDescriptionsProps) => {
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

  const itemsUsaha = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_usaha?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: data?.sk_usaha?.address,
    },
    {
      key: "bussiness",
      label: "Jenis Usaha",
      children: data?.sk_usaha?.bussiness,
    },
    {
      key: "reason",
      label: "Alasan",
      children: data?.sk_usaha?.reason,
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
        title="Data Usaha"
        layout="vertical"
        items={itemsUsaha}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKUsahaDescriptions;
