import { ContentPaper } from "@/components/atoms/paper";
import SKDomisiliDescriptions from "@/components/general/views/SKDomisiliDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkDomisiliDetail } from "@/services/sk-domisili.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Empty, Space, Splitter } from "antd";
import { toDataURL } from "qrcode";
import { useLocation, useParams } from "react-router";
import SKDomisiliTemplate from "../pdfs/SKDomisiliTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKDomisiliDetailView = ({ type }: ISKDetailViewProps) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data: skDomisiliDetail, isLoading: skDomisiliDetailIsLoading } =
    useGetSkDomisiliDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skDomisiliDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skDomisiliDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      previewPdf(
        <SKDomisiliTemplate data={skDomisiliDetail?.data} qrCodeValue={qr} />
      );
    });
  };

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/verify/${skDomisiliDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKDomisiliTemplate data={skDomisiliDetail?.data} qrCodeValue={qr} />,
        {
          fileName: `SK_Domisili_${id}.pdf`,
        }
      );
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
      <Splitter className="gap-3 min-h-[calc(100vh-21rem)]">
        <Splitter.Panel defaultSize="60%" min={"50%"}>
          <SKDomisiliDescriptions data={skDomisiliDetail?.data} />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="40%" min={"40%"}>
          {isAllApproved || pathname.includes("review-sk") ? (
            <PDFViewer className="w-full h-full" showToolbar={false}>
              <SKDomisiliTemplate
                data={skDomisiliDetail?.data}
                qrCodeValue={null}
              />
            </PDFViewer>
          ) : (
            <div className="flex h-full justify-center items-center">
              <Empty description="Dokumen Belum Disetujui"></Empty>
            </div>
          )}
        </Splitter.Panel>
      </Splitter>
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
