import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKKtpSementaraDescriptionsProps {
  data: ISuratKeterangan;
}

const SKKtpSementaraDescriptions = ({
  data,
}: ISKKtpSementaraDescriptionsProps) => {
  const itemsKtpSementara = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_ktp_sementara?.name,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.sk_ktp_sementara?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.sk_ktp_sementara?.gender && (
        <GenderLabel gender={data?.sk_ktp_sementara?.gender} />
      ),
    },
    {
      key: "born_place",
      label: "Tempat Lahir",
      children: data?.sk_ktp_sementara?.born_place,
    },
    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.sk_ktp_sementara?.born_birth &&
        format(
          new Date(data?.sk_ktp_sementara?.born_birth),
          "EEEE, dd MMMM yyyy"
        ),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.sk_ktp_sementara?.religion,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan",
      children: data?.sk_ktp_sementara?.marital_status && (
        <MaritalStatusLabel status={data?.sk_ktp_sementara?.marital_status} />
      ),
    },
    {
      key: "address",
      label: "Alamat",
      span: 3,
      children: data?.sk_ktp_sementara?.address,
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
        items={itemsKtpSementara}
        bordered
        column={2}
      />
    </Space>
  );
};
export default SKKtpSementaraDescriptions;
