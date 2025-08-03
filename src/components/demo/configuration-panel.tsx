"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings } from "lucide-react";
import { FileUploaderConfig } from "@/types/file-uploader";
import {
  variantOptions,
  stylePresetOptions,
  sizeOptions,
  fileTypeOptions,
} from "@/constants/file-uploader";

interface ConfigurationPanelProps {
  config: FileUploaderConfig;
  updateConfig: (key: keyof FileUploaderConfig, value: FileUploaderConfig[keyof FileUploaderConfig]) => void;
}

export const ConfigurationPanel = ({
  config,
  updateConfig,
}: ConfigurationPanelProps) => {
  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <h2 className="text-lg font-semibold">Configuration</h2>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <div className="space-y-4">
          {/* Basic Settings */}
          <div>
            <h3 className="text-sm font-medium mb-2">Basic Settings</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="variant">Variant</Label>
                <Select
                  value={config.defaultVariant}
                  onValueChange={(value) =>
                    updateConfig("defaultVariant", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {variantOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="stylePreset">Style Preset</Label>
                <Select
                  value={config.stylePreset}
                  onValueChange={(value) => updateConfig("stylePreset", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stylePresetOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="size">Size</Label>
                <Select
                  value={config.size}
                  onValueChange={(value) => updateConfig("size", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* File Settings */}
          <div>
            <h3 className="text-sm font-medium mb-2">File Settings</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="maxFileSizeMB">Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={config.maxFileSizeMB}
                  onChange={(e) =>
                    updateConfig("maxFileSizeMB", Number(e.target.value))
                  }
                  min="1"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="acceptedFileTypes">Accepted File Types</Label>
                <Select
                  value={config.acceptedFileTypes}
                  onValueChange={(value) =>
                    updateConfig("acceptedFileTypes", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fileTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.allowMultipleFiles}
                  onCheckedChange={(checked) =>
                    updateConfig("allowMultipleFiles", checked)
                  }
                />
                <Label htmlFor="allowMultipleFiles">Allow Multiple Files</Label>
              </div>

              {config.allowMultipleFiles && (
                <div>
                  <Label htmlFor="maxFiles">Max Files</Label>
                  <Input
                    type="number"
                    value={config.maxFiles}
                    onChange={(e) =>
                      updateConfig("maxFiles", Number(e.target.value))
                    }
                    min="1"
                    max="20"
                  />
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Text Settings */}
          <div>
            <h3 className="text-sm font-medium mb-2">Text Settings</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="uploadLabel">Upload Label</Label>
                <Input
                  value={config.uploadLabel}
                  onChange={(e) => updateConfig("uploadLabel", e.target.value)}
                  placeholder="Upload"
                />
              </div>

              <div>
                <Label htmlFor="placeholderText">Placeholder Text</Label>
                <Input
                  value={config.placeholderText}
                  onChange={(e) =>
                    updateConfig("placeholderText", e.target.value)
                  }
                  placeholder="Upload your file"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Custom Styling */}
          <div>
            <h3 className="text-sm font-medium mb-2">Custom Styling</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="customWidth">Width</Label>
                  <Input
                    value={config.customWidth}
                    onChange={(e) =>
                      updateConfig("customWidth", e.target.value)
                    }
                    placeholder="w-64"
                  />
                </div>
                <div>
                  <Label htmlFor="customHeight">Height</Label>
                  <Input
                    value={config.customHeight}
                    onChange={(e) =>
                      updateConfig("customHeight", e.target.value)
                    }
                    placeholder="h-64"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customBorder">Border</Label>
                <Input
                  value={config.customBorder}
                  onChange={(e) => updateConfig("customBorder", e.target.value)}
                  placeholder="border border-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="customBorderRadius">Border Radius</Label>
                <Input
                  value={config.customBorderRadius}
                  onChange={(e) =>
                    updateConfig("customBorderRadius", e.target.value)
                  }
                  placeholder="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
