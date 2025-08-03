import { FileUploaderConfig } from "@/types/file-uploader";

export const generateCode = (config: FileUploaderConfig): string => {
  return `import { FileUploader } from "@/components/file";

const config = ${JSON.stringify(config, null, 2)};

<FileUploader config={config} />`;
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
  }
};
