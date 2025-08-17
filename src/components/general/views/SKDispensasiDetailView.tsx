import { ContentPaper } from "@/components/atoms/paper";
import SKDispensasiDescriptions from "@/components/general/views/SKDispensasiDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkDispensasiDetail } from "@/services/sk-dispensasi.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Empty, Space, Splitter } from "antd";
import { toDataURL } from "qrcode";
import { useLocation, useParams } from "react-router";
import SKDispensasiTemplate from "../pdfs/SKDispensasiTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKDispensasiDetailView = ({ type }: ISKDetailViewProps) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data: skDispensasiDetail, isLoading: skDispensasiDetailIsLoading } =
    useGetSkDispensasiDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf } = usePdf();
  const isAllApproved = skDispensasiDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skDispensasiDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKDispensasiTemplate
          data={skDispensasiDetail?.data}
          qrCodeValue={qr}
        />,
        {
          fileName: `SK_Dispensasi_${id}.pdf`,
        }
      );
    });
  };

  return (
    <ContentPaper
      title="Detail SK Dispensasi"
      isLoading={skDispensasiDetailIsLoading}
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
            key="download"
            onClick={handleSkDownload}
            disabled={skDispensasiDetailIsLoading || !isAllApproved}
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
          <SKDispensasiDescriptions data={skDispensasiDetail?.data} />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="40%" min={"40%"}>
          {isAllApproved || pathname.includes("review-sk") ? (
            <PDFViewer className="w-full h-full" showToolbar={false}>
              <SKDispensasiTemplate
                data={skDispensasiDetail?.data}
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

export default SKDispensasiDetailView;
