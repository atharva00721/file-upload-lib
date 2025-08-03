"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileUploader } from "@/components/file";
import { FileUploaderConfig } from "@/types/file-uploader";

interface PreviewPanelProps {
  config: FileUploaderConfig;
}

export const PreviewPanel = ({ config }: PreviewPanelProps) => {
  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <Badge variant="secondary">{config.defaultVariant}</Badge>
      </div>
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <FileUploader config={config} />
      </div>
    </Card>
  );
};
