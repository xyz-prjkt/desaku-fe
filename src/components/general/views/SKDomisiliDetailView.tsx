import { ContentPaper } from "@/components/atoms/paper";
import SKDomisiliDescriptions from "@/components/general/views/SKDomisiliDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkDomisiliDetail } from "@/services/sk-domisili.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKDomisiliDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skDomisiliDetail, isLoading: skDomisiliDetailIsLoading } =
    useGetSkDomisiliDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Domisili"
      isLoading={skDomisiliDetailIsLoading}
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
      <SKDomisiliDescriptions data={skDomisiliDetail?.data} />
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

export default SKDomisiliDetailView;
