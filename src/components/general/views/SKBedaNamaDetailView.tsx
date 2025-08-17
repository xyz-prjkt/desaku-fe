import { ContentPaper } from "@/components/atoms/paper";
import SKBedaNamaDescriptions from "@/components/general/views/SKBedaNamaDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkBedaNamaDetail } from "@/services/sk-beda-nama.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { toDataURL } from "qrcode";
import { useParams } from "react-router";
import SKBedaNamaTemplate from "../pdfs/SKBedaNamaTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKBedaNamaDetailView = ({ type }: ISKDetailViewProps) => {
  const { id } = useParams();
  const { data: skBedaNamaDetail, isLoading: skBedaNamaDetailIsLoading } =
    useGetSkBedaNamaDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skBedaNamaDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skBedaNamaDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      previewPdf(
        <SKBedaNamaTemplate data={skBedaNamaDetail?.data} qrCodeValue={qr} />
      );
    });
  };

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skBedaNamaDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKBedaNamaTemplate data={skBedaNamaDetail?.data} qrCodeValue={qr} />,
        {
          fileName: `SK_Beda_Nama_${id}.pdf`,
        }
      );
    });
  };

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
            disabled={skBedaNamaDetailIsLoading || !isAllApproved}
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
