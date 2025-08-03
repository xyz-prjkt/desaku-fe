import { ContentPaper } from "@/components/atoms/paper";
import SKKematianDescriptions from "@/components/general/views/SKKematianDescriptions";
import { useGetSkKematianDetail } from "@/services/sk-kematian.service";
import { FileWordFilled } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

const SKReviewKematianDetail = () => {
  const { id } = useParams();
  const { data: skKematianDetail, isLoading: skKematianDetailIsLoading } =
    useGetSkKematianDetail(id);

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
      <SKKematianDescriptions data={skKematianDetail?.data} />
    </ContentPaper>
  );
};

export default SKReviewKematianDetail;
