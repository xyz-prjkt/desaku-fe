import { ContentPaper } from "@/components/atoms/paper";
import SKKehilanganDescriptions from "@/components/general/views/SKKehilanganDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKehilanganDetail } from "@/services/sk-kehilangan.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { toDataURL } from "qrcode";
import { useParams } from "react-router";
import SKKehilanganTemplate from "../pdfs/SKKehilanganTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKKehilanganDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skKehilanganDetail, isLoading: skKehilanganDetailIsLoading } =
    useGetSkKehilanganDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skKehilanganDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skKehilanganDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      previewPdf(
        <SKKehilanganTemplate
          data={skKehilanganDetail?.data}
          qrCodeValue={qr}
        />
      );
    });
  };

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skKehilanganDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKKehilanganTemplate
          data={skKehilanganDetail?.data}
          qrCodeValue={qr}
        />,
        {
          fileName: `SK_Kehilangan_${id}.pdf`,
        }
      );
    });
  };

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
            disabled={skKehilanganDetailIsLoading || !isAllApproved}
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
