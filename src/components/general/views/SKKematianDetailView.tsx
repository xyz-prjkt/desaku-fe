import { ContentPaper } from "@/components/atoms/paper";
import SKKematianDescriptions from "@/components/general/views/SKKematianDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKematianDetail } from "@/services/sk-kematian.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

const SKKematianDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skKematianDetail, isLoading: skKematianDetailIsLoading } =
    useGetSkKematianDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Kematian"
      isLoading={skKematianDetailIsLoading}
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
      <SKKematianDescriptions data={skKematianDetail?.data} />
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

export default SKKematianDetailView;
