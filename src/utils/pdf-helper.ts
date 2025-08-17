import { pdf, DocumentProps } from "@react-pdf/renderer";
import { ReactElement, useState } from "react";

interface IPDFDownloadOptions {
  fileName?: string;
}

export const usePdf = () => {
  const [isLoading, setIsLoading] = useState(false);

  const previewPdf = async (template: ReactElement<DocumentProps>) => {
    setIsLoading(true);
    await pdf(template)
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        window.addEventListener("beforeunload", () => URL.revokeObjectURL(url));
      })
      .finally(() => setIsLoading(false));
  };

  const downloadPdf = async (
    template: ReactElement<DocumentProps>,
    options?: IPDFDownloadOptions
  ) => {
    setIsLoading(true);
    await pdf(template)
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = options?.fileName || "document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, downloadPdf, previewPdf };
};
