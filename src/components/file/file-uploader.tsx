"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Image,
  Trash2,
  UploadCloud,
  X,
  AlertCircle,
  Keyboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * FileUploader Component with LLM-friendly configuration
 *
 * Configuration follows a flat, declarative structure for easy LLM editing:
 * - Default variant selection
 * - Max file size and accepted types
 * - Style presets (default, outline, ghost, destructive, secondary)
 * - Labels and placeholder text
 * - Custom styling overrides
 */

type FileUploaderConfig = {
  // Default variant selection
  defaultVariant?:
    | "button"
    | "drag-and-drop"
    | "preview layout"
    | "image-only"
    | "multi-file";

  // File validation
  maxFileSizeMB?: number;
  acceptedFileTypes?: string;

  // Style presets
  stylePreset?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";

  // Labels and text
  uploadLabel?: string;
  placeholderText?: string;

  // Multi-file settings
  allowMultipleFiles?: boolean;
  maxFiles?: number;

  // Custom styling (optional overrides)
  customWidth?: string;
  customHeight?: string;
  customBorder?: string;
  customBorderRadius?: string;
  customBackgroundColor?: string;
  customTextColor?: string;
};

type FileItem = {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
};

type Props = {
  src?: string;
  config?: FileUploaderConfig;
};

const defaultConfig: FileUploaderConfig = {
  defaultVariant: "preview layout",
  maxFileSizeMB: 10,
  acceptedFileTypes: "image/*",
  stylePreset: "default",
  size: "md",
  uploadLabel: "Upload",
  placeholderText: "Upload your file",
  allowMultipleFiles: false,
  maxFiles: 6,
  customWidth: "w-64",
  customHeight: "h-64",
  customBorder: "border border-gray-300",
  customBorderRadius: "rounded-md",
};

// Style variants inspired by shadcn/ui
const styleVariants = {
  default: {
    container: "bg-background border-border text-foreground",
    button: "bg-primary text-primary-foreground hover:bg-primary/90",
    placeholder: "bg-muted text-muted-foreground",
    dragActive: "border-primary bg-primary/5",
  },
  outline: {
    container: "bg-background border-border text-foreground",
    button:
      "border border-border bg-background text-foreground text-background hover:text-foregroundborder bg-background shadow-xs hover:bg-accent text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
    placeholder: "bg-muted/50 text-muted-foreground",
    dragActive: "border-primary bg-primary/5",
  },
  ghost: {
    container: "bg-transparent border-transparent text-foreground",
    button: "bg-transparent hover:bg-accent text-foreground",
    placeholder: "bg-muted/30 text-muted-foreground",
    dragActive: "border-primary/50 bg-primary/5",
  },
  destructive: {
    container: "bg-destructive/10 border-destructive/20 text-destructive",
    button:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    placeholder: "bg-destructive/5 text-destructive/70",
    dragActive: "border-destructive bg-destructive/10",
  },
  secondary: {
    container: "bg-secondary border-secondary text-secondary-foreground",
    button: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    placeholder: "bg-secondary/50 text-secondary-foreground/70",
    dragActive: "border-primary bg-primary/10",
  },
};

// Size variants
const sizeVariants = {
  sm: {
    container: "h-32 text-xs",
    button: "h-8 px-3 text-xs",
    icon: "w-4 h-4",
    placeholder: "text-xs",
  },
  md: {
    container: "h-40 text-sm",
    button: "h-10 px-4 text-sm",
    icon: "w-5 h-5",
    placeholder: "text-sm",
  },
  lg: {
    container: "h-48 text-base",
    button: "h-12 px-6 text-base",
    icon: "w-6 h-6",
    placeholder: "text-base",
  },
  xl: {
    container: "h-56 text-lg",
    button: "h-14 px-8 text-lg",
    icon: "w-7 h-7",
    placeholder: "text-lg",
  },
};

// Helper function to format file types for display
const formatFileTypes = (accept: string): string => {
  if (accept === "image/*") return "Images";
  if (accept === "video/*") return "Videos";
  if (accept === "audio/*") return "Audio files";
  if (accept === "*/*") return "All files";

  // Handle specific file extensions
  const extensions = accept.split(",").map((type) => {
    const trimmed = type.trim();
    if (trimmed.startsWith(".")) {
      return trimmed.substring(1).toUpperCase();
    }
    if (trimmed.includes("/")) {
      return trimmed.split("/")[1].toUpperCase();
    }
    return trimmed.toUpperCase();
  });

  return extensions.join(", ");
};

const FileUploader = ({ src = "", config }: Props) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [filepath, setFilepath] = useState<string>(src);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  // Multi-file state
  const [files, setFiles] = useState<FileItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  // Get variant classes
  const getStyleClasses = () => {
    const style = styleVariants[mergedConfig.stylePreset || "default"];
    const size = sizeVariants[mergedConfig.size || "md"];
    return { style, size };
  };

  const getContainerClasses = (baseClasses: string = "") => {
    const { style, size } = getStyleClasses();
    return cn(
      baseClasses,
      style.container,
      size.container,
      mergedConfig.customWidth,
      mergedConfig.customHeight,
      mergedConfig.customBorder,
      mergedConfig.customBorderRadius
    );
  };

  const getButtonClasses = (baseClasses: string = "") => {
    const { style, size } = getStyleClasses();
    return cn(baseClasses, style.button, size.button);
  };

  const getPlaceholderClasses = (baseClasses: string = "") => {
    const { style, size } = getStyleClasses();
    return cn(baseClasses, style.placeholder, size.placeholder);
  };

  const getDragActiveClasses = () => {
    const { style } = getStyleClasses();
    return style.dragActive;
  };

  const getIconSize = () => {
    const { size } = getStyleClasses();
    return size.icon;
  };

  const handleFile = (file: File) => {
    if (
      mergedConfig.maxFileSizeMB &&
      file.size / (1024 * 1024) > mergedConfig.maxFileSizeMB
    ) {
      alert(`File size exceeds ${mergedConfig.maxFileSizeMB}MB.`);
      return;
    }

    const preview = URL.createObjectURL(file);
    setFilepath(preview);
    setFileName(file.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleReset = () => {
    setFilepath("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);

      if (mergedConfig.defaultVariant === "multi-file") {
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleMultipleFiles(droppedFiles);
      } else {
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }
    },
    [mergedConfig.defaultVariant]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Only set dragActive to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragActive(false);
    }
  }, []);

  const handleMultipleFiles = (newFiles: File[]) => {
    const maxFiles = mergedConfig.maxFiles || 6;
    const maxSize = (mergedConfig.maxFileSizeMB || 10) * 1024 * 1024;

    const validFiles: FileItem[] = [];
    const newErrors: string[] = [];

    newFiles.forEach((file) => {
      // Check file size
      if (file.size > maxSize) {
        newErrors.push(`${file.name} exceeds ${mergedConfig.maxFileSizeMB}MB`);
        return;
      }

      // Check if we've reached max files
      if (files.length + validFiles.length >= maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Check file type
      if (
        mergedConfig.acceptedFileTypes &&
        mergedConfig.acceptedFileTypes !== "*/*"
      ) {
        const acceptedTypes = mergedConfig.acceptedFileTypes
          .split(",")
          .map((t: string) => t.trim());
        const isAccepted = acceptedTypes.some((type: string) => {
          if (type.endsWith("/*")) {
            return file.type.startsWith(type.replace("/*", ""));
          }
          return (
            file.type === type ||
            file.name.toLowerCase().endsWith(type.replace(".", ""))
          );
        });

        if (!isAccepted) {
          newErrors.push(`${file.name} is not an accepted file type`);
          return;
        }
      }

      const fileItem: FileItem = {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
      };

      validFiles.push(fileItem);
    });

    setFiles((prev) => [...prev, ...validFiles]);
    setErrors(newErrors);
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleMultipleFiles(selectedFiles);
  };

  // Keyboard event handlers for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Enter or Space to open file dialog
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFileDialog();
    }

    // Ctrl/Cmd + O to open file dialog (common file open shortcut)
    if ((e.ctrlKey || e.metaKey) && e.key === "o") {
      e.preventDefault();
      openFileDialog();
    }
  };

  // Focus management
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Prevent default drag behaviors on the document and add global keyboard shortcuts
  useEffect(() => {
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Global Ctrl/Cmd + O shortcut to open file dialog
      if ((e.ctrlKey || e.metaKey) && e.key === "o") {
        e.preventDefault();
        openFileDialog();
      }
    };

    document.addEventListener("dragover", preventDefaults);
    document.addEventListener("drop", preventDefaults);
    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("dragover", preventDefaults);
      document.removeEventListener("drop", preventDefaults);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const containerClasses = "space-y-2";

  const renderUploadZone = () => {
    if (mergedConfig.defaultVariant === "multi-file") {
      return (
        <motion.div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          role="button"
          aria-label={`Upload files by dragging and dropping or clicking to browse. Accepted file types: ${formatFileTypes(
            mergedConfig.acceptedFileTypes!
          )}. Maximum file size: ${
            mergedConfig.maxFileSizeMB
          }MB. Maximum files: ${mergedConfig.maxFiles}`}
          aria-describedby="multi-file-instructions"
          animate={{
            scale: dragActive ? 1.02 : 1,
            borderWidth: dragActive ? "3px" : "2px",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            "relative flex flex-col border-2 border-dashed transition-all duration-300 overflow-hidden p-4 outline-none",
            dragActive ? getDragActiveClasses() : getPlaceholderClasses(),
            isFocused && !dragActive && "ring-2 ring-primary ring-offset-2",
            mergedConfig.customWidth,
            mergedConfig.customHeight,
            mergedConfig.customBorderRadius
          )}
        >
          <input
            type="file"
            accept={mergedConfig.acceptedFileTypes}
            ref={inputRef}
            onChange={handleMultiFileChange}
            multiple
            hidden
            id="multi-file-input"
          />

          {files.length > 0 ? (
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <h3
                  className="truncate text-sm font-medium"
                  id="uploaded-files-count"
                >
                  Uploaded Files ({files.length})
                </h3>
                <Button
                  className={getButtonClasses()}
                  size="sm"
                  onClick={openFileDialog}
                  disabled={files.length >= (mergedConfig.maxFiles || 6)}
                  aria-label={`Add more files. Current files: ${files.length} of ${mergedConfig.maxFiles}`}
                >
                  <UploadCloud
                    className="w-3.5 h-3.5 mr-1 opacity-60"
                    aria-hidden="true"
                  />
                  Add more
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <AnimatePresence>
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="bg-accent relative aspect-square rounded-md overflow-hidden group cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFile(file.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Remove ${file.name} (${(
                        file.size /
                        1024 /
                        1024
                      ).toFixed(1)}MB)`}
                    >
                      <img
                        src={file.preview}
                        alt={`Preview of ${file.name}`}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg">
                          <X className="size-5" aria-hidden="true" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <Image className="size-4 opacity-60" aria-hidden="true" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Drop your files here</p>
              <p className="text-muted-foreground text-xs">
                {formatFileTypes(mergedConfig.acceptedFileTypes!)} (max.{" "}
                {mergedConfig.maxFileSizeMB}MB each)
              </p>
              <div
                className="flex items-center gap-2 mt-2 text-xs text-muted-foreground"
                id="multi-file-instructions"
              >
                <Keyboard className="w-3 h-3" aria-hidden="true" />
                <span>Press Enter, Space, or Ctrl+O to browse</span>
              </div>
              <Button
                className={cn("mt-4", getButtonClasses())}
                onClick={openFileDialog}
                aria-label="Select files to upload"
              >
                <UploadCloud
                  className="w-4 h-4 mr-1 opacity-60"
                  aria-hidden="true"
                />
                Select files
              </Button>
            </div>
          )}

          {files.length === 0 && (
            <div
              onClick={openFileDialog}
              className="absolute inset-0 cursor-pointer"
              aria-hidden="true"
            />
          )}
        </motion.div>
      );
    }

    if (mergedConfig.defaultVariant === "drag-and-drop") {
      return (
        <motion.div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          role="button"
          aria-label={`Upload file by dragging and dropping or clicking to browse. Accepted file types: ${formatFileTypes(
            mergedConfig.acceptedFileTypes!
          )}. Maximum file size: ${mergedConfig.maxFileSizeMB}MB`}
          aria-describedby="drag-drop-instructions"
          animate={{
            scale: dragActive ? 1.02 : 1,
            borderWidth: dragActive ? "3px" : "2px",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            "relative flex items-center justify-center border-2 border-dashed transition-all duration-300 overflow-hidden outline-none",
            dragActive ? getDragActiveClasses() : getPlaceholderClasses(),
            isFocused && !dragActive && "ring-2 ring-primary ring-offset-2",
            mergedConfig.customWidth,
            mergedConfig.customHeight,
            mergedConfig.customBorderRadius
          )}
        >
          <AnimatePresence mode="wait">
            {filepath ? (
              <motion.img
                key="preview"
                src={filepath}
                alt={`Preview of uploaded file: ${fileName}`}
                width={220}
                height={220}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center flex flex-col items-center text-sm gap-2 text-muted-foreground"
              >
                <UploadCloud className="w-6 h-6" aria-hidden="true" />
                <p>{mergedConfig.placeholderText}</p>
                <p className="text-xs opacity-70">or click to upload</p>
                <div className="text-xs opacity-60 space-y-1">
                  <p>Max size: {mergedConfig.maxFileSizeMB}MB</p>
                  <p>
                    Type: {formatFileTypes(mergedConfig.acceptedFileTypes!)}
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 mt-2 text-xs opacity-60"
                  id="drag-drop-instructions"
                >
                  <Keyboard className="w-3 h-3" aria-hidden="true" />
                  <span>Press Enter, Space, or Ctrl+O to browse</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type="file"
            accept={mergedConfig.acceptedFileTypes}
            ref={inputRef}
            onChange={handleFileChange}
            hidden
            id="drag-input"
          />
          <div
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 cursor-pointer"
            aria-hidden="true"
          />
        </motion.div>
      );
    }

    // preview layout variant
    if (mergedConfig.defaultVariant === "preview layout") {
      return (
        <motion.div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          role="button"
          aria-label={`Upload file by dragging and dropping or clicking to browse. Accepted file types: ${formatFileTypes(
            mergedConfig.acceptedFileTypes!
          )}. Maximum file size: ${mergedConfig.maxFileSizeMB}MB`}
          aria-describedby="preview-instructions"
          layout
          animate={{
            scale: dragActive ? 1.02 : 1,
            borderWidth: dragActive ? "3px" : "2px",
            opacity: 1,
            y: 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            "overflow-hidden border-2 border-dashed outline-none",
            dragActive ? getDragActiveClasses() : getPlaceholderClasses(),
            isFocused && !dragActive && "ring-2 ring-primary ring-offset-2",
            getContainerClasses(),
            mergedConfig.customBorder,
            mergedConfig.customBorderRadius
          )}
          initial={{ opacity: 0, y: 10 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <AnimatePresence mode="wait">
            {filepath ? (
              <motion.img
                key="preview"
                src={filepath}
                alt={`Preview of uploaded file: ${fileName}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <motion.div
                key="preview-placeholder"
                className={cn(
                  "flex flex-col items-center justify-center h-full gap-2",
                  getPlaceholderClasses()
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  className={cn(getIconSize(), "opacity-40")}
                  aria-hidden="true"
                />
                <span>{mergedConfig.placeholderText}</span>
                <div
                  className="flex items-center gap-2 mt-2 text-xs opacity-60"
                  id="preview-instructions"
                >
                  <Keyboard className="w-3 h-3" aria-hidden="true" />
                  <span>Press Enter, Space, or Ctrl+O to browse</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    // 👇 button variant - handled in main return
    if (mergedConfig.defaultVariant === "button") {
      return null;
    }

    // 👇 fallback variant (used for other variants)
    return (
      <motion.div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="button"
        aria-label={`Upload file by dragging and dropping or clicking to browse. Accepted file types: ${formatFileTypes(
          mergedConfig.acceptedFileTypes!
        )}. Maximum file size: ${mergedConfig.maxFileSizeMB}MB`}
        aria-describedby="default-instructions"
        animate={{
          scale: dragActive ? 1.02 : 1,
          borderWidth: dragActive ? "3px" : "2px",
          opacity: 1,
          y: 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          "overflow-hidden border-2 border-dashed outline-none",
          dragActive ? getDragActiveClasses() : getPlaceholderClasses(),
          isFocused && !dragActive && "ring-2 ring-primary ring-offset-2",
          getContainerClasses(),
          mergedConfig.customBorder,
          mergedConfig.customBorderRadius
        )}
        initial={{ opacity: 0, y: 10 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <AnimatePresence mode="wait">
          {filepath ? (
            <motion.img
              key="default-preview"
              src={filepath}
              alt={`Preview of uploaded file: ${fileName}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <motion.div
              key="default-placeholder"
              className={cn(
                "flex flex-col items-center justify-center h-full gap-2",
                getPlaceholderClasses()
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                className={cn(getIconSize(), "opacity-40")}
                aria-hidden="true"
              />
              <span>{mergedConfig.placeholderText}</span>
              <div
                className="flex items-center gap-2 mt-2 text-xs opacity-60"
                id="default-instructions"
              >
                <Keyboard className="w-3 h-3" aria-hidden="true" />
                <span>Press Enter, Space, or Ctrl+O to browse</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div
      className={containerClasses}
      role="region"
      aria-label="File upload component"
    >
      <input
        ref={inputRef}
        type="file"
        accept={mergedConfig.acceptedFileTypes}
        onChange={
          mergedConfig.defaultVariant === "multi-file"
            ? handleMultiFileChange
            : handleFileChange
        }
        multiple={mergedConfig.defaultVariant === "multi-file"}
        hidden
        id="file-input"
        aria-label={`File input for ${
          mergedConfig.defaultVariant
        } upload. Accepted types: ${formatFileTypes(
          mergedConfig.acceptedFileTypes!
        )}`}
      />

      {mergedConfig.defaultVariant === "button" ? (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {filepath ? (
                <motion.div
                  key="button-preview"
                  className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-border"
                  role="img"
                  aria-label={`Preview of uploaded file: ${fileName}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={filepath}
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="button-placeholder"
                  className="w-12 h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0 border border-border"
                  role="img"
                  aria-label="No file uploaded"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image className="w-6 h-6 opacity-40" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div className="flex-1">
              <Button
                className={cn("w-full", getButtonClasses())}
                onClick={() => inputRef.current?.click()}
                variant={filepath ? "outline" : "default"}
                aria-label={
                  filepath
                    ? `Change uploaded file: ${fileName}`
                    : `Upload file. Accepted types: ${formatFileTypes(
                        mergedConfig.acceptedFileTypes!
                      )}`
                }
              >
                {filepath ? "Change file" : mergedConfig.uploadLabel}
              </Button>
            </motion.div>
          </div>

          {filepath && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-1"
            >
              {/* <p className="text-sm text-muted-foreground">{fileName}</p> */}
              <Button
                variant="ghost"
                size="sm"
                className="w-fit h-auto p-0 text-red-500 hover:text-red-600 hover:bg-transparent"
                onClick={handleReset}
                aria-label={`Remove uploaded file: ${fileName}`}
              >
                Remove
              </Button>
            </motion.div>
          )}
        </div>
      ) : (
        <>
          {renderUploadZone()}

          {mergedConfig.defaultVariant !== "drag-and-drop" &&
            mergedConfig.defaultVariant !== "multi-file" && (
              <motion.div>
                <Button
                  className={cn("w-full", getButtonClasses())}
                  onClick={() => inputRef.current?.click()}
                  aria-label={`${
                    mergedConfig.uploadLabel
                  }. Accepted file types: ${formatFileTypes(
                    mergedConfig.acceptedFileTypes!
                  )}. Maximum file size: ${mergedConfig.maxFileSizeMB}MB`}
                >
                  {mergedConfig.uploadLabel}
                </Button>
              </motion.div>
            )}
        </>
      )}

      {filepath &&
        mergedConfig.defaultVariant !== "button" &&
        mergedConfig.defaultVariant !== "multi-file" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-1"
          >
            {/* <p className="text-sm text-muted-foreground">{fileName}</p> */}
            <Button
              variant="ghost"
              size="sm"
              className="w-fit h-auto p-0 text-red-500 hover:text-red-600 hover:bg-transparent"
              onClick={handleReset}
              aria-label={`Remove uploaded file: ${fileName}`}
            >
              Remove
            </Button>
          </motion.div>
        )}

      {/* Error messages for multi-file upload */}
      {mergedConfig.defaultVariant === "multi-file" && errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 text-xs text-red-500"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="size-3 shrink-0" aria-hidden="true" />
          <span>{errors[0]}</span>
        </motion.div>
      )}
    </div>
  );
};

export default FileUploader;
