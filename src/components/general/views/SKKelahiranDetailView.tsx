import { ContentPaper } from "@/components/atoms/paper";
import SKKelahiranDescriptions from "@/components/general/views/SKKelahiranDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKelahiranDetail } from "@/services/sk-kelahiran.service";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKKelahiranDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skKelahiranDetail, isLoading: skKelahiranDetailIsLoading } =
    useGetSkKelahiranDetail(id, type === "review");

  const updateSk = useDialog<string>();

  return (
    <ContentPaper
      title="Detail SK Kelahiran"
      isLoading={skKelahiranDetailIsLoading}
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
      <SKKelahiranDescriptions data={skKelahiranDetail?.data} />
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

export default SKKelahiranDetailView;
