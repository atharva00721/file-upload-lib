"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Code, FileText } from "lucide-react";
import { FileUploaderConfig } from "@/types/file-uploader";
import { generateCode, copyToClipboard } from "@/utils/file-uploader";

interface InfoPanelProps {
  config: FileUploaderConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const InfoPanel = ({
  config,
  activeTab,
  setActiveTab,
}: InfoPanelProps) => {
  const handleCopyCode = () => {
    copyToClipboard(generateCode(config));
  };

  const handleCopyConfig = () => {
    copyToClipboard(JSON.stringify(config, null, 2));
  };

  return (
    <Card className="p-4 h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Code
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  About This Component
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A highly customizable file upload component with multiple
                  variants, real-time configuration, and support for various use
                  cases.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">
                  Where This Can Be Used
                </h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="text-sm font-medium mb-1">
                      User Profile Management
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Profile picture uploads, avatar management, and user media
                      galleries
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="text-sm font-medium mb-1">
                      Content Management Systems
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Blog post images, article attachments, and media libraries
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="text-sm font-medium mb-1">
                      E-commerce Platforms
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Product image uploads, bulk image imports, and catalog
                      management
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="text-sm font-medium mb-1">
                      Document Management
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      File uploads, document sharing, and collaborative
                      workspaces
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="text-sm font-medium mb-1">
                      Form Applications
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Resume uploads, application attachments, and form
                      submissions
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="text-sm font-medium mb-1">
                      Social Media Platforms
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Photo sharing, story uploads, and media content creation
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • Multiple upload variants (Button, Drag & Drop, Preview,
                    Multi-file)
                  </li>
                  <li>• Real-time configuration and preview</li>
                  <li>• File type and size validation</li>
                  <li>• Custom styling and theming</li>
                  <li>• Accessibility support</li>
                  <li>• Responsive design</li>
                  <li>• Export/Import configurations</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated Code</h3>
              <Button variant="outline" size="sm" onClick={handleCopyCode}>
                Copy Code
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{generateCode(config)}</code>
              </pre>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="config" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Current Configuration</h3>
              <Button variant="outline" size="sm" onClick={handleCopyConfig}>
                Copy JSON
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{JSON.stringify(config, null, 2)}</code>
              </pre>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
