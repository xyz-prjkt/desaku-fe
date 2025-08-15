import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKDispensasiDescriptionsProps {
  data: ISuratKeterangan;
}

const SKDispensasiDescriptions = ({ data }: ISKDispensasiDescriptionsProps) => {
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

  const itemsDispensasi = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_dispensasi?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: data?.sk_dispensasi?.address,
    },
    {
      key: "start_date",
      label: "Tanggal Mulai Dispensasi",
      children:
        data?.sk_dispensasi?.start_date &&
        format(new Date(data?.sk_dispensasi?.start_date), "dd MMMM yyyy"),
    },
    {
      key: "end_date",
      label: "Tanggal Akhir Dispensasi",
      children:
        data?.sk_dispensasi?.end_date &&
        format(new Date(data?.sk_dispensasi?.end_date), "dd MMMM yyyy"),
    },
    {
      key: "reason",
      label: "Alasan Dispensasi",
      children: data?.sk_dispensasi?.reason,
    },
    {
      key: "purpose",
      label: "Tujuan Dispensasi",
      children: data?.sk_dispensasi?.purpose,
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
        title="Data Dispensasi"
        layout="vertical"
        items={itemsDispensasi}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKDispensasiDescriptions;
