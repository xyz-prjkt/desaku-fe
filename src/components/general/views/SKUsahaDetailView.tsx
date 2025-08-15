import { ContentPaper } from "@/components/atoms/paper";
import SKUsahaDescriptions from "@/components/general/views/SKUsahaDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkUsahaDetail } from "@/services/sk-usaha.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKUsahaDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skUsahaDetail, isLoading: skUsahaDetailIsLoading } =
    useGetSkUsahaDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Usaha"
      isLoading={skUsahaDetailIsLoading}
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
      <SKUsahaDescriptions data={skUsahaDetail?.data} />
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

export default SKUsahaDetailView;
