import { useState, useCallback, useRef } from "react";

interface FileWithPreview {
  id: string;
  file: File;
  preview: string;
}

interface UseFileUploadOptions {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  minSize?: number; // in bytes
  onFilesSelected?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  onError?: (error: string) => void;
}

interface UseFileUploadReturn {
  files: FileWithPreview[];
  removeFile: (id: string) => void;
  openFileDialog: () => void;
  getInputProps: () => {
    type: string;
    accept?: string;
    multiple?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ref: React.RefObject<HTMLInputElement | null>;
  };
  clearFiles: () => void;
  isUploading: boolean;
  uploadProgress: number;
}

export const useFileUpload = (
  options: UseFileUploadOptions = {}
): UseFileUploadReturn => {
  const {
    accept = "*/*",
    multiple = false,
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024, // 10MB
    minSize = 0,
    onFilesSelected,
    onUpload,
    onError,
  } = options;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // File validation
  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `File ${
          file.name
        } is too large. Maximum size is ${formatFileSize(maxSize)}`;
      }
      if (minSize && file.size < minSize) {
        return `File ${
          file.name
        } is too small. Minimum size is ${formatFileSize(minSize)}`;
      }

      // Check file type
      if (accept !== "*/*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const isValidType = acceptedTypes.some((type) => {
          if (type.endsWith("/*")) {
            return file.type.startsWith(type.replace("/*", ""));
          }
          return file.type === type;
        });
        if (!isValidType) {
          return `File ${file.name} has an unsupported type. Allowed types: ${accept}`;
        }
      }

      return null;
    },
    [maxSize, minSize, accept]
  );

  // Create preview URL for files
  const createFilePreview = useCallback(
    (file: File): Promise<FileWithPreview> => {
      return new Promise((resolve) => {
        const id = Math.random().toString(36).substr(2, 9);

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              id,
              file,
              preview: e.target?.result as string,
            });
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, create a placeholder preview
          resolve({
            id,
            file,
            preview: `data:text/plain;base64,${btoa(file.name)}`,
          });
        }
      });
    },
    []
  );

  // Handle file selection
  const handleFiles = useCallback(
    async (selectedFiles: FileList | File[]) => {
      const fileArray = Array.from(selectedFiles);
      const validFiles: File[] = [];
      const errors: string[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
          onError?.(error);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        // Create previews for all valid files
        const filesWithPreviews = await Promise.all(
          validFiles.map(createFilePreview)
        );

        const newFiles = multiple
          ? [...files, ...filesWithPreviews]
          : filesWithPreviews;
        const finalFiles = newFiles.slice(0, maxFiles);

        setFiles(finalFiles);
        onFilesSelected?.(finalFiles.map((f) => f.file));

        // Auto-upload if onUpload is provided
        if (onUpload) {
          setIsUploading(true);
          setUploadProgress(0);

          try {
            // Simulate upload progress
            const interval = setInterval(() => {
              setUploadProgress((prev) => {
                if (prev >= 90) {
                  clearInterval(interval);
                  return 90;
                }
                return prev + 10;
              });
            }, 200);

            await onUpload(finalFiles.map((f) => f.file));

            clearInterval(interval);
            setUploadProgress(100);

            setTimeout(() => {
              setIsUploading(false);
              setUploadProgress(0);
            }, 500);
          } catch (error) {
            setIsUploading(false);
            setUploadProgress(0);
            onError?.(error instanceof Error ? error.message : "Upload failed");
          }
        }
      }
    },
    [
      files,
      multiple,
      maxFiles,
      validateFile,
      createFilePreview,
      onFilesSelected,
      onError,
      onUpload,
    ]
  );

  // Remove file by ID
  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Open file dialog
  const openFileDialog = useCallback(() => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  }, [isUploading]);

  // Clear all files
  const clearFiles = useCallback(() => {
    setFiles([]);
    setIsUploading(false);
    setUploadProgress(0);
  }, []);

  // Get input props for the file input
  const getInputProps = useCallback(
    () => ({
      type: "file",
      accept,
      multiple,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          handleFiles(e.target.files);
        }
      },
      ref: fileInputRef,
    }),
    [accept, multiple, handleFiles]
  );

  return {
    files,
    removeFile,
    openFileDialog,
    getInputProps,
    clearFiles,
    isUploading,
    uploadProgress,
  };
};
