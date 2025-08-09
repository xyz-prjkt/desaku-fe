import { useAnt } from "@/hooks";
import { useDownloadSkTidakMampu } from "@/services/sk-tidak-mampu.service";
import { FileWordFilled } from "@ant-design/icons";
import { Button } from "antd";

interface SKTidakMampuDownloadButtonProps {
  id: string;
  isAdmin: boolean;
  disabled?: boolean;
}

const SKTidakMampuDownloadButton = ({
  id,
  isAdmin,
  disabled,
}: SKTidakMampuDownloadButtonProps) => {
  const { message } = useAnt();
  const { mutateAsync: downloadSkTidakMampu } = useDownloadSkTidakMampu(
    id,
    isAdmin
  );

  const handleSkDownload = async () =>
    await downloadSkTidakMampu().catch((err) =>
      message.error((err as Error).message)
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

export default SKTidakMampuDownloadButton;
