import { ContentPaper } from "@/components/atoms/paper";
import SKKehilanganDescriptions from "@/components/general/views/SKKehilanganDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKehilanganDetail } from "@/services/sk-kehilangan.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKKehilanganDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skKehilanganDetail, isLoading: skKehilanganDetailIsLoading } =
    useGetSkKehilanganDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Kehilangan"
      isLoading={skKehilanganDetailIsLoading}
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
      <SKKehilanganDescriptions data={skKehilanganDetail?.data} />
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

export default SKKehilanganDetailView;
