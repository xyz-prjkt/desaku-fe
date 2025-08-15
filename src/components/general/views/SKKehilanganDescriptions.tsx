import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKKehilanganDescriptionsProps {
  data: ISuratKeterangan;
}

const SKKehilanganDescriptions = ({ data }: ISKKehilanganDescriptionsProps) => {
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

  const itemsKehilangan = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_kehilangan?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: data?.sk_kehilangan?.address,
    },
    {
      key: "lost_object",
      label: "Barang yang Hilang",
      children: data?.sk_kehilangan?.lost_object,
    },
    {
      key: "lost_place",
      label: "Tempat Kehilangan",
      children: data?.sk_kehilangan?.lost_place,
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
        title="Data Kehilangan"
        layout="vertical"
        items={itemsKehilangan}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKKehilanganDescriptions;
