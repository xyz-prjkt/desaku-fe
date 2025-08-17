import { ContentPaper } from "@/components/atoms/paper";
import SKDomisiliDescriptions from "@/components/general/views/SKDomisiliDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkDomisiliDetail } from "@/services/sk-domisili.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useParams } from "react-router";
import SKDomisiliTemplate from "../pdfs/SKDomisiliTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKDomisiliDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skDomisiliDetail, isLoading: skDomisiliDetailIsLoading } =
    useGetSkDomisiliDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skDomisiliDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    previewPdf(<SKDomisiliTemplate data={skDomisiliDetail?.data} />);
  };

  const handleSkDownload = async () => {
    downloadPdf(<SKDomisiliTemplate data={skDomisiliDetail?.data} />, {
      fileName: `SK_Domisili_${id}.pdf`,
    });
  };

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
          <Button
            key="preview"
            onClick={handleSKPreview}
            disabled={isLoading || !isAllApproved}
            loading={isLoading}
          >
            Preview SK
          </Button>
          <Button
            key="download"
            onClick={handleSkDownload}
            disabled={skDomisiliDetailIsLoading || !isAllApproved}
            loading={isLoading}
            color="red"
            variant="solid"
            icon={<FilePdfOutlined />}
          >
            Download SK as PDF
          </Button>
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
