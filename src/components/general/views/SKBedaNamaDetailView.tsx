import { ContentPaper } from "@/components/atoms/paper";
import SKBedaNamaDescriptions from "@/components/general/views/SKBedaNamaDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkBedaNamaDetail } from "@/services/sk-beda-nama.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKBedaNamaDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skBedaNamaDetail, isLoading: skBedaNamaDetailIsLoading } =
    useGetSkBedaNamaDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Beda Nama"
      isLoading={skBedaNamaDetailIsLoading}
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
      <SKBedaNamaDescriptions data={skBedaNamaDetail?.data} />
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

export default SKBedaNamaDetailView;
