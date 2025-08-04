import { ContentPaper } from "@/components/atoms/paper";
import SKKematianDownloadButton from "@/components/general/buttons/SKKematianDownloadButton";
import SKKematianDescriptions from "@/components/general/views/SKKematianDescriptions";
import { useGetSkKematianDetail } from "@/services/sk-kematian.service";
import { Space } from "antd";
import { useParams } from "react-router";

const SKKematianDetail = () => {
  const { id } = useParams();
  const { data: skKematianDetail, isLoading: skKematianDetailIsLoading } =
    useGetSkKematianDetail(id);

  return (
    <ContentPaper
      title="Detail SK Kematian"
      isLoading={skKematianDetailIsLoading}
      action={
        <Space>
          <SKKematianDownloadButton
            id={id}
            isAdmin={false}
            disabled={skKematianDetail?.data?.user_approvers?.every(
              (approver) => approver.status !== "APPROVED",
            )}
          />
        </Space>
      }
    >
      <SKKematianDescriptions data={skKematianDetail?.data} />
    </ContentPaper>
  );
};

export default SKKematianDetail;
