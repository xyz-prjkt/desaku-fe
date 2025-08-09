import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKTidakMampuDescriptionsProps {
  data: ISuratKeterangan;
}

const SKTidakMampuDescriptions = ({ data }: ISKTidakMampuDescriptionsProps) => {
  const itemsTidakMampu = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_tidak_mampu?.name,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.sk_tidak_mampu?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.sk_tidak_mampu?.gender && (
        <GenderLabel gender={data?.sk_tidak_mampu?.gender} />
      ),
    },
    {
      key: "born_place",
      label: "Tempat Lahir",
      children: data?.sk_tidak_mampu?.born_place,
    },
    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.sk_tidak_mampu?.born_birth &&
        format(
          new Date(data?.sk_tidak_mampu?.born_birth),
          "EEEE, dd MMMM yyyy"
        ),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.sk_tidak_mampu?.religion,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan",
      children: data?.sk_tidak_mampu?.marital_status && (
        <MaritalStatusLabel status={data?.sk_tidak_mampu?.marital_status} />
      ),
    },
    {
      key: "work",
      label: "Pekerjaan",
      children: data?.sk_tidak_mampu?.work,
    },
    {
      key: "address",
      label: "Alamat",
      span: 3,
      children: data?.sk_tidak_mampu?.address,
    },
    {
      key: "reason",
      label: "Alasan Permohonan",
      span: 3,
      children: data?.sk_tidak_mampu?.reason,
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
    <Space className="w-full" direction="vertical" size={24}>
      <Descriptions
        size="small"
        title="Informasi Pemohon"
        layout="vertical"
        bordered
        items={itemsTidakMampu}
      />
    </Space>
  );
};

export default SKTidakMampuDescriptions;
