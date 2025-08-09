import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKTidakMampuDescriptionsProps {
  data: ISuratKeterangan;
}

const SKTidakMampuDescriptions = ({ data }: ISKTidakMampuDescriptionsProps) => {
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

  const getMaritalStatusLabel = (status: string) => {
    const statusMap = {
      SINGLE: "Belum Menikah",
      MARRIED: "Menikah",
      DIVORCED: "Bercerai",
      WIDOWED: "Janda/Duda",
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getGenderLabel = (gender: string) => {
    return gender === "MALE" ? "Laki-laki" : "Perempuan";
  };

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
      children:
        data?.sk_tidak_mampu?.gender &&
        getGenderLabel(data?.sk_tidak_mampu?.gender),
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
      children:
        data?.sk_tidak_mampu?.marital_status &&
        getMaritalStatusLabel(data?.sk_tidak_mampu?.marital_status),
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
        title="Informasi Pemohon"
        layout="vertical"
        bordered
        items={itemsTidakMampu}
      />
    </Space>
  );
};

export default SKTidakMampuDescriptions;
