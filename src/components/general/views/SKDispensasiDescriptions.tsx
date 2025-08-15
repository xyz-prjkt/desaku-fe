import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Descriptions, Space } from "antd";
import { format } from "date-fns";

interface ISKDispensasiDescriptionsProps {
  data: ISuratKeterangan;
}

const SKDispensasiDescriptions = ({ data }: ISKDispensasiDescriptionsProps) => {
  const itemsDispensasi = [
    {
      key: "name",
      label: "Nama",
      children: data?.sk_dispensasi?.name,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.sk_dispensasi?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.sk_dispensasi?.gender && (
        <GenderLabel gender={data?.sk_dispensasi?.gender} />
      ),
    },
    {
      key: "born_place",
      label: "Tempat Lahir",
      children: data?.sk_dispensasi?.born_place,
    },
    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.sk_dispensasi?.born_birth &&
        format(new Date(data?.sk_dispensasi?.born_birth), "EEEE, dd MMMM yyyy"),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.sk_dispensasi?.religion,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan",
      children: data?.sk_dispensasi?.marital_status && (
        <MaritalStatusLabel status={data?.sk_dispensasi?.marital_status} />
      ),
    },
    {
      key: "address",
      label: "Alamat",
      span: 3,
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
      span: 3,
      children: data?.sk_dispensasi?.reason,
    },
    {
      key: "purpose",
      label: "Tujuan Dispensasi",
      span: 3,
      children: data?.sk_dispensasi?.purpose,
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
        items={itemsDispensasi}
        bordered
        column={2}
      />
    </Space>
  );
};

export default SKDispensasiDescriptions;
