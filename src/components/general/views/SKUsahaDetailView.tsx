import { ContentPaper } from "@/components/atoms/paper";
import SKUsahaDescriptions from "@/components/general/views/SKUsahaDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkUsahaDetail } from "@/services/sk-usaha.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { toDataURL } from "qrcode";
import { useParams } from "react-router";
import SKUsahaTemplate from "../pdfs/SKUsahaTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKUsahaDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skUsahaDetail, isLoading: skUsahaDetailIsLoading } =
    useGetSkUsahaDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skUsahaDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skUsahaDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      previewPdf(
        <SKUsahaTemplate data={skUsahaDetail?.data} qrCodeValue={qr} />
      );
    });
  };

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skUsahaDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKUsahaTemplate data={skUsahaDetail?.data} qrCodeValue={qr} />,
        {
          fileName: `SK_Usaha_${id}.pdf`,
        }
      );
    });
  };

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
            disabled={skUsahaDetailIsLoading || !isAllApproved}
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
