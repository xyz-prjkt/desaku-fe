import { ContentPaper } from "@/components/atoms/paper";
import SKKtpSementaraDescriptions from "@/components/general/views/SKKtpSementaraDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKtpSementaraDetail } from "@/services/sk-ktp-sementara.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { toDataURL } from "qrcode";
import { useParams } from "react-router";
import SKKtpSementaraTemplate from "../pdfs/SKKtpSementaraTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKKtpSementaraDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const {
    data: skKtpSementaraDetail,
    isLoading: skKtpSementaraDetailIsLoading,
  } = useGetSkKtpSementaraDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skKtpSementaraDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skKtpSementaraDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      previewPdf(
        <SKKtpSementaraTemplate
          data={skKtpSementaraDetail?.data}
          qrCodeValue={qr}
        />
      );
    });
  };

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skKtpSementaraDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKKtpSementaraTemplate
          data={skKtpSementaraDetail?.data}
          qrCodeValue={qr}
        />,
        {
          fileName: `SK_KTP_Sementara_${id}.pdf`,
        }
      );
    });
  };

  return (
    <ContentPaper
      title="Detail SK KTP Sementara"
      isLoading={skKtpSementaraDetailIsLoading}
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
            disabled={skKtpSementaraDetailIsLoading || !isAllApproved}
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
      <SKKtpSementaraDescriptions data={skKtpSementaraDetail?.data} />
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

export default SKKtpSementaraDetailView;
