import { ContentPaper } from "@/components/atoms/paper";
import SKKematianDownloadButton from "@/components/general/buttons/SKKematianDownloadButton";
import SKKematianDescriptions from "@/components/general/views/SKKematianDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKematianDetail } from "@/services/sk-kematian.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

const SKReviewKematianDetail = () => {
  const { id } = useParams();
  const { data: skKematianDetail, isLoading: skKematianDetailIsLoading } =
    useGetSkKematianDetail(id);

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Kematian"
      isLoading={skKematianDetailIsLoading}
      action={
        <Space.Compact>
          <Button
            icon={<EditOutlined />}
            onClick={() => updateSk.handleClickOpen(id)}
          >
            Ubah Status
          </Button>
          <SKKematianDownloadButton
            id={id}
            isAdmin={true}
            disabled={skKematianDetail?.data?.user_approvers?.every(
              (approver) => approver.status !== "APPROVED",
            )}
          />
        </Space.Compact>
      }
    >
      <SKKematianDescriptions data={skKematianDetail?.data} />
      {updateSk.open && (
        <UpdateStatusModal
          open={updateSk.open}
          onClose={updateSk.handleClose}
          skId={updateSk.data}
        />
      )}
    </ContentPaper>
  );
};

export default SKReviewKematianDetail;
