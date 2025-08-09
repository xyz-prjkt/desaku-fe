import { ContentPaper } from "@/components/atoms/paper";
import SKTidakMampuDescriptions from "@/components/general/views/SKTidakMampuDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkTidakMampuDetail } from "@/services/sk-tidak-mampu.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";
import SKTidakMampuDownloadButton from "../buttons/SKTidakMampuDownloadButton";

const SKTidakMampuDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skTidakMampuDetail, isLoading: skTidakMampuDetailIsLoading } =
    useGetSkTidakMampuDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Tidak Mampu"
      isLoading={skTidakMampuDetailIsLoading}
      action={
        <Space.Compact>
          {type === "review" && (
            <Button
              icon={<EditOutlined />}
              onClick={() => updateSk.handleClickOpen(id)}
            >
              Ubah Status
            </Button>
          )}
          <SKTidakMampuDownloadButton
            id={id}
            isAdmin={true}
            disabled={skTidakMampuDetail?.data?.user_approvers?.every(
              (approver) => approver.status !== "APPROVED"
            )}
          />
        </Space.Compact>
      }
    >
      <SKTidakMampuDescriptions data={skTidakMampuDetail?.data} />
      {type === "review" && updateSk.open && (
        <UpdateStatusModal
          open={updateSk.open}
          onClose={updateSk.handleClose}
          skId={updateSk.data}
        />
      )}
    </ContentPaper>
  );
};

export default SKTidakMampuDetailView;
