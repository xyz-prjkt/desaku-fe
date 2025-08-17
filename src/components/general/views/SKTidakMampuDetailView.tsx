import { ContentPaper } from "@/components/atoms/paper";
import SKTidakMampuDescriptions from "@/components/general/views/SKTidakMampuDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkTidakMampuDetail } from "@/services/sk-tidak-mampu.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Empty, Space, Splitter } from "antd";
import { toDataURL } from "qrcode";
import { useLocation, useParams } from "react-router";
import SKTidakMampuTemplate from "../pdfs/SKTidakMampuTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKTidakMampuDetailView = ({ type }: ISKDetailViewProps) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data: skTidakMampuDetail, isLoading: skTidakMampuDetailIsLoading } =
    useGetSkTidakMampuDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skTidakMampuDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skTidakMampuDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      previewPdf(
        <SKTidakMampuTemplate
          data={skTidakMampuDetail?.data}
          qrCodeValue={qr}
        />
      );
    });
  };

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/verify/${skTidakMampuDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKTidakMampuTemplate
          data={skTidakMampuDetail?.data}
          qrCodeValue={qr}
        />,
        {
          fileName: `SK_Tidak_Mampu_${id}.pdf`,
        }
      );
    });
  };

  return (
    <ContentPaper
      title="Detail SK Tidak Mampu"
      isLoading={skTidakMampuDetailIsLoading}
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
            disabled={skTidakMampuDetailIsLoading || !isAllApproved}
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
          <SKTidakMampuDescriptions data={skTidakMampuDetail?.data} />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="40%" min={"40%"}>
          {isAllApproved || pathname.includes("review-sk") ? (
            <PDFViewer className="w-full h-full" showToolbar={false}>
              <SKTidakMampuTemplate
                data={skTidakMampuDetail?.data}
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

export default SKTidakMampuDetailView;
