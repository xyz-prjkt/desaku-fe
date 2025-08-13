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
      label: "Surat Keterangan Kematian",
      children: <MySKKematianTable />,
    },
    {
      key: "sk-tidak-mampu",
      label: "Surat Keterangan Tidak Mampu",
      children: <MySKTidakMampuTable />,
    },
    {
      key: "sk-dispensasi",
      label: "Surat Keterangan Dispensasi",
      children: <MySKDispensasiTable />,
    },
    {
      key: "sk-beda-nama",
      label: "Surat Keterangan Beda Nama",
      children: <MySKBedaNamaTable />,
    },
    {
      key: "sk-domisili",
      label: "Surat Keterangan Domisili",
      children: <MySKDomisiliTable />,
    },
    {
      key: "sk-kehilangan",
      label: "Surat Keterangan Kehilangan",
      children: <MySKKehilanganTable />,
    },
    {
      key: "sk-kelahiran",
      label: "Surat Keterangan Kelahiran",
      children: <MySKKelahiranTable />,
    },
    {
      key: "sk-usaha",
      label: "Surat Keterangan Usaha",
      children: <MySKUsahaTable />,
    },
    {
      key: "sk-ktp-sementara",
      label: "Surat Keterangan KTP Sementara",
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
