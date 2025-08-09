import { ContentPaper } from "@/components/atoms/paper";
import SKTidakMampuDownloadButton from "@/components/general/buttons/SKTidakMampuDownloadButton";
import SKTidakMampuDescriptions from "@/components/general/views/SKTidakMampuDescriptions";
import { useGetSkTidakMampuDetail } from "@/services/sk-tidak-mampu.service";
import { Space } from "antd";
import { useParams } from "react-router";

const SKTidakMampuDetail = () => {
  const { id } = useParams();
  const { data: skTidakMampuDetail, isLoading: skTidakMampuDetailIsLoading } =
    useGetSkTidakMampuDetail(id);

  return (
    <ContentPaper
      title="Detail SK Tidak Mampu"
      isLoading={skTidakMampuDetailIsLoading}
      action={
        <Space>
          <SKTidakMampuDownloadButton
            id={id}
            isAdmin={false}
            disabled={skTidakMampuDetail?.data?.user_approvers?.every(
              (approver) => approver.status !== "APPROVED"
            )}
          />
        </Space>
      }
    >
      <SKTidakMampuDescriptions data={skTidakMampuDetail?.data} />
    </ContentPaper>
  );
};

export default SKTidakMampuDetail;
