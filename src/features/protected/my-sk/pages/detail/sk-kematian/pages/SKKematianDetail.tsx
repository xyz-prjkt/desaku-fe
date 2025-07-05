import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ContentPaper } from "@/components/atoms/paper";
import { useGetSkKematianDetail } from "@/services/sk-kematian.service";
import { FileWordFilled } from "@ant-design/icons";
import { Button, Descriptions, Space } from "antd";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { useParams } from "react-router";

const SKKematianDetail = () => {
  const { id } = useParams();
  const { data: skKematianDetail, isLoading: skKematianDetailIsLoading } =
    useGetSkKematianDetail(id);

  const itemsPengaju = [
    {
      key: "createdAt",
      label: "Tanggal Pengajuan",
      children:
        skKematianDetail?.data?.createdAt &&
        format(
          new Date(skKematianDetail?.data?.createdAt),
          "EEEE, dd MMMM yyyy, HH:mm",
          {
            locale: localeId,
          }
        ),
    },
    {
      key: "status",
      label: "Status",
      children: (
        <ApprovalsTag approvers={skKematianDetail?.data?.user_approvers} />
      ),
    },
  ];

  const itemsKematian = [
    {
      key: "name",
      label: "Nama",
      children: skKematianDetail?.data?.sk_kematian?.name,
    },
    {
      key: "address",
      label: "Alamat",
      children: skKematianDetail?.data?.sk_kematian?.address,
    },
    {
      key: "nik",
      label: "NIK",
      children: skKematianDetail?.data?.sk_kematian?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: skKematianDetail?.data?.sk_kematian?.gender,
    },
    {
      key: "religion",
      label: "Agama",
      children: skKematianDetail?.data?.sk_kematian?.religion,
    },
    {
      key: "death_date",
      label: "Tanggal Kematian",
      children:
        skKematianDetail?.data?.sk_kematian?.death_date &&
        format(
          new Date(skKematianDetail?.data?.sk_kematian?.death_date),
          "EEEE, dd MMMM yyyy",
          {
            locale: localeId,
          }
        ),
    },
    {
      key: "death_place",
      label: "Tempat Kematian",
      children: skKematianDetail?.data?.sk_kematian?.death_place,
    },

    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        skKematianDetail?.data?.sk_kematian?.born_birth &&
        format(
          new Date(skKematianDetail?.data?.sk_kematian?.born_birth),
          "EEEE, dd MMMM yyyy",
          {
            locale: localeId,
          }
        ),
    },
    {
      key: "death_reason",
      label: "Penyebab Kematian",
      span: 3,
      children: skKematianDetail?.data?.sk_kematian?.death_reason,
    },
  ];
  return (
    <ContentPaper
      title="Detail SK Kematian"
      isLoading={skKematianDetailIsLoading}
      action={
        <Space>
          <Button icon={<FileWordFilled />} color="blue" variant="solid">
            Download Surat Keterangan
          </Button>
        </Space>
      }
    >
      <Space className="w-full" direction="vertical" size={24}>
        <Descriptions title="Informasi Pengaju" items={itemsPengaju} bordered />
        <Descriptions
          title="Informasi Mendiang"
          items={itemsKematian}
          bordered
        />
      </Space>
    </ContentPaper>
  );
};

export default SKKematianDetail;
