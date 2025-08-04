const downloadBlobFromResponse = async (blob: Blob, filename: string) => {
  try {
    const link = document.createElement("a");
    const urlObject = URL.createObjectURL(blob);

    link.href = urlObject;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(urlObject);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

export { downloadBlobFromResponse };
