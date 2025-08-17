import { ContentPaper } from "@/components/atoms/paper";
import SKKelahiranDescriptions from "@/components/general/views/SKKelahiranDescriptions";
import UpdateStatusModal from "@/features/protected/sk-review/components/UpdateStatusModal";
import { useDialog } from "@/hooks";
import { useGetSkKelahiranDetail } from "@/services/sk-kelahiran.service";
import { usePdf } from "@/utils/pdf-helper";
import { EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Empty, Space, Splitter } from "antd";
import { toDataURL } from "qrcode";
import { useLocation, useParams } from "react-router";
import SKKelahiranTemplate from "../pdfs/SKKelahiranTemplate";

type ISKDetailType = "review" | "view";

interface ISKDetailViewProps {
  type: ISKDetailType;
}

const SKKelahiranDetailView = ({ type }: ISKDetailViewProps) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data: skKelahiranDetail, isLoading: skKelahiranDetailIsLoading } =
    useGetSkKelahiranDetail(id, type === "review");

  const updateSk = useDialog<string>();
  const { isLoading, downloadPdf, previewPdf } = usePdf();
  const isAllApproved = skKelahiranDetail?.data?.user_approvers.every(
    (approver) => approver.status === "APPROVED"
  );

  const handleSKPreview = async () => {
    await toDataURL(
      `${window.location.origin}/validate/${skKelahiranDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      previewPdf(
        <SKKelahiranTemplate data={skKelahiranDetail?.data} qrCodeValue={qr} />
      );
    });
  };

  const handleSkDownload = async () => {
    await toDataURL(
      `${window.location.origin}/verify/${skKelahiranDetail.data?.id}`,
      {
        width: 100,
      }
    ).then((qr) => {
      downloadPdf(
        <SKKelahiranTemplate data={skKelahiranDetail?.data} qrCodeValue={qr} />,
        {
          fileName: `SK_Kelahiran_${id}.pdf`,
        }
      );
    });
  };

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
            disabled={skKelahiranDetailIsLoading || !isAllApproved}
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
          <SKKelahiranDescriptions data={skKelahiranDetail?.data} />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="40%" min={"40%"}>
          {isAllApproved || pathname.includes("review-sk") ? (
            <PDFViewer className="w-full h-full" showToolbar={false}>
              <SKKelahiranTemplate
                data={skKelahiranDetail?.data}
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

export default SKKelahiranDetailView;
