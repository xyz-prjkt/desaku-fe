import { ContentPaper } from "@/components/atoms/paper";
import SKKtpSementaraDescriptions from "@/components/general/views/SKKtpSementaraDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKtpSementaraDetail } from "@/services/sk-ktp-sementara.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKKtpSementaraDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const {
    data: skKtpSementaraDetail,
    isLoading: skKtpSementaraDetailIsLoading,
  } = useGetSkKtpSementaraDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK KTP Sementara"
      isLoading={skKtpSementaraDetailIsLoading}
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
        </Space.Compact>
      }
    >
      <SKKtpSementaraDescriptions data={skKtpSementaraDetail?.data} />
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

export default SKKtpSementaraDetailView;
