import GenderLabel from "@/components/general/labels/GenderLabel";
import MaritalStatusLabel from "@/components/general/labels/MaritalStatusLabel";
import { IUserDetail } from "@/interfaces/services/user";
import { Card, Descriptions, Grid } from "antd";
import { format } from "date-fns";

interface ProfileInformationProps {
  data: IUserDetail;
}

const ProfileInformation = ({ data }: ProfileInformationProps) => {
  const { xs } = Grid.useBreakpoint();
  const personalInfoItems = [
    {
      key: "name",
      label: "Nama Lengkap",
      children: data?.name,
    },
    {
      key: "email",
      label: "Email",
      children: data?.email,
    },
    {
      key: "nik",
      label: "NIK",
      children: data?.nik,
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      children: data?.gender && <GenderLabel gender={data?.gender} />,
    },
    {
      key: "born_place",
      label: "Tempat Lahir",
      children: data?.born_place,
    },
    {
      key: "born_birth",
      label: "Tanggal Lahir",
      children:
        data?.born_birth &&
        format(new Date(data?.born_birth), "EEEE, dd MMMM yyyy"),
    },
    {
      key: "religion",
      label: "Agama",
      children: data?.religion,
    },
    {
      key: "marital_status",
      label: "Status Pernikahan",
      children: data?.marital_status && (
        <MaritalStatusLabel status={data?.marital_status} />
      ),
    },
    {
      key: "work",
      label: "Pekerjaan",
      children: data?.work,
    },
    {
      key: "address",
      label: "Alamat",
      span: 3,
      children: data?.address,
    },
  ];

  return (
    <Card size="small">
      <Descriptions
        className="mt-2"
        size="small"
        title="Informasi Pribadi"
        layout="vertical"
        bordered
        items={personalInfoItems}
        column={xs ? 1 : 3}
      />
    </Card>
  );
};

export default ProfileInformation;
