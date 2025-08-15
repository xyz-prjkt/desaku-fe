import { ContentPaper } from "@/components/atoms/paper";
import SKDispensasiDescriptions from "@/components/general/views/SKDispensasiDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkDispensasiDetail } from "@/services/sk-dispensasi.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKDispensasiDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skDispensasiDetail, isLoading: skDispensasiDetailIsLoading } =
    useGetSkDispensasiDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Dispensasi"
      isLoading={skDispensasiDetailIsLoading}
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
      <SKDispensasiDescriptions data={skDispensasiDetail?.data} />
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

export default SKDispensasiDetailView;
