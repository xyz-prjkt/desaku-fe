import { ContentPaper } from "@/components/atoms/paper";
import { Tabs } from "antd";
import MySKKematianTable from "../components/sk-kematian/MySKKematianTable";
import MySKTidakMampuTable from "../components/sk-tidak-mampu/MySKTidakMampuTable";
import MySKDispensasiTable from "../components/sk-dispensasi/MySKDispensasiTable";
import MySKBedaNamaTable from "../components/sk-beda-nama/MySKBedaNamaTable";
import MySKDomisiliTable from "../components/sk-domisili/MySKDomisiliTable";
import MySKKehilanganTable from "../components/sk-kehilangan/MySKKehilanganTable";
import MySKKelahiranTable from "../components/sk-kelahiran/MySKKelahiranTable";
import MySKUsahaTable from "../components/sk-usaha/MySKUsahaTable";
import MySKKtpSementaraTable from "../components/sk-ktp-sementara/MySKKtpSementaraTable";

const MySKPages = () => {
  const items = [
    {
      key: "sk-kematian",
      label: "SK Kematian",
      children: <MySKKematianTable />,
    },
    {
      key: "sk-tidak-mampu",
      label: "SK Tidak Mampu",
      children: <MySKTidakMampuTable />,
    },
    {
      key: "sk-dispensasi",
      label: "SK Dispensasi",
      children: <MySKDispensasiTable />,
    },
    {
      key: "sk-beda-nama",
      label: "SK Beda Nama",
      children: <MySKBedaNamaTable />,
    },
    {
      key: "sk-domisili",
      label: "SK Domisili",
      children: <MySKDomisiliTable />,
    },
    {
      key: "sk-kehilangan",
      label: "SK Kehilangan",
      children: <MySKKehilanganTable />,
    },
    {
      key: "sk-kelahiran",
      label: "SK Kelahiran",
      children: <MySKKelahiranTable />,
    },
    {
      key: "sk-usaha",
      label: "SK Usaha",
      children: <MySKUsahaTable />,
    },
    {
      key: "sk-ktp-sementara",
      label: "SK KTP Sementara",
      children: <MySKKtpSementaraTable />,
    },
  ];
  return (
    <ContentPaper title="Surat Keterangan Saya">
      <Tabs items={items} />
    </ContentPaper>
  );
};

export default MySKPages;
