import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKKtpSementaraDescriptionsProps {
  data: ISuratKeterangan;
}

const SKKtpSementaraDescriptions = ({
  data,
}: ISKKtpSementaraDescriptionsProps) => {
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

  const itemsKtpSementara = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_ktp_sementara?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: data?.sk_ktp_sementara?.address,
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
        title="Data KTP Sementara"
        layout="vertical"
        items={itemsKtpSementara}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKKtpSementaraDescriptions;
