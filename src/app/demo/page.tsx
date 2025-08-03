"use client";
import { useState } from "react";
import { FileUploaderConfig } from "@/types/file-uploader";
import { defaultConfig } from "@/constants/file-uploader";
import { ConfigurationPanel } from "@/components/demo/configuration-panel";
import { PreviewPanel } from "@/components/demo/preview-panel";
import { InfoPanel } from "@/components/demo/info-panel";

const DemoPage = () => {
  const [config, setConfig] = useState<FileUploaderConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState("about");

  const updateConfig = (
    key: keyof FileUploaderConfig,
    value: FileUploaderConfig[keyof FileUploaderConfig]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-screen bg-background p-4">
      <div className="max-w-9xl mx-auto h-full">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-2 items-center">
          <h1 className="text-2xl font-bold mb-1">File Uploader Component</h1>
          <p className="text-sm text-muted-foreground">
            A versatile file upload component with multiple variants and
            real-time configuration
          </p>
        </div>

        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(95vh-280px)]">
          {/* Left Column - Configuration Panel */}
          <div className="lg:col-span-1">
            <ConfigurationPanel config={config} updateConfig={updateConfig} />
          </div>

          {/* Center Column - Component Display */}
          <div className="lg:col-span-1">
            <PreviewPanel config={config} />
          </div>

          {/* Right Column - About Section with Tabs */}
          <div className="lg:col-span-1">
            <InfoPanel
              config={config}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
