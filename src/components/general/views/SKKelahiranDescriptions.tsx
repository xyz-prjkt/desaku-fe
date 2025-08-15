import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKKelahiranDescriptionsProps {
  data: ISuratKeterangan;
}

const SKKelahiranDescriptions = ({ data }: ISKKelahiranDescriptionsProps) => {
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

  const itemsKelahiran = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_kelahiran?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: data?.sk_kelahiran?.address,
    },
    {
      key: "father_name",
      label: "Nama Ayah",
      children: data?.sk_kelahiran?.father_name,
    },
    {
      key: "mother_name",
      label: "Nama Ibu",
      children: data?.sk_kelahiran?.mother_name,
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
        title="Data Kelahiran"
        layout="vertical"
        items={itemsKelahiran}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKKelahiranDescriptions;
