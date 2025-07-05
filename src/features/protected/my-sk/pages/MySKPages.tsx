import { ContentPaper } from "@/components/atoms/paper";
import { Tabs } from "antd";
import MySKKematianTable from "../components/sk-kematian/MySKKematianTable";
import MySKTidakMampuTable from "../components/sk-tidak-mampu/MySKTidakMampuTable";

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
  ];
  return (
    <ContentPaper title="Surat Keterangan Saya">
      <Tabs items={items} />
    </ContentPaper>
  );
};

export default MySKPages;
