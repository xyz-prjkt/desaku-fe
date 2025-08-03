import { ContentPaper } from "@/components/atoms/paper";
import SKKematianDescriptions from "@/components/general/views/SKKematianDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKematianDetail } from "@/services/sk-kematian.service";
import { EditOutlined, FileWordFilled } from "@ant-design/icons";
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
          <Button icon={<FileWordFilled />} color="blue" variant="solid">
            Unduh SK
          </Button>
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
