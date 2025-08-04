import { useAnt } from "@/hooks";
import { useDownloadSkKematian } from "@/services/sk-kematian.service";
import { FileWordFilled } from "@ant-design/icons";
import { Button } from "antd";

interface SKKematianDownloadButtonProps {
  id: string;
  isAdmin: boolean;
  disabled?: boolean;
}

const SKKematianDownloadButton = ({
  id,
  isAdmin,
  disabled,
}: SKKematianDownloadButtonProps) => {
  const { message } = useAnt();
  const { mutateAsync: downloadSkKematian } = useDownloadSkKematian(
    id,
    isAdmin,
  );

  const handleSkDownload = async () =>
    await downloadSkKematian().catch((err) =>
      message.error((err as Error).message),
    );

  return (
    <Button
      icon={<FileWordFilled />}
      color="blue"
      variant="solid"
      onClick={() => handleSkDownload()}
      disabled={disabled}
    >
      Download Surat Keterangan
    </Button>
  );
};

export default SKKematianDownloadButton;
