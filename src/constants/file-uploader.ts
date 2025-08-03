import {
  FileUploaderConfig,
  VariantOption,
  StylePresetOption,
  SizeOption,
  FileTypeOption,
  UseCase,
} from "@/types/file-uploader";

export const defaultConfig: FileUploaderConfig = {
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

export const variantOptions: VariantOption[] = [
  {
    value: "button",
    label: "Button",
    description: "Simple button with preview",
  },
  {
    value: "drag-and-drop",
    label: "Drag & Drop",
    description: "Interactive drag and drop zone",
  },
  {
    value: "preview layout",
    label: "Preview Layout",
    description: "Preview-focused layout",
  },
  {
    value: "image-only",
    label: "Image Only",
    description: "Image-specific uploader",
  },
  {
    value: "multi-file",
    label: "Multi File",
    description: "Multiple file upload support",
  },
];

export const stylePresetOptions: StylePresetOption[] = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
  { value: "destructive", label: "Destructive" },
  { value: "secondary", label: "Secondary" },
];

export const sizeOptions: SizeOption[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
];

export const fileTypeOptions: FileTypeOption[] = [
  { value: "image/*", label: "Images" },
  { value: "video/*", label: "Videos" },
  { value: "audio/*", label: "Audio" },
  { value: "application/pdf", label: "PDF" },
  { value: ".doc,.docx", label: "Documents" },
  { value: "*/*", label: "All Files" },
];

export const useCases: UseCase[] = [
  {
    title: "Profile Picture Upload",
    description: "Perfect for user profile management systems",
    variant: "preview layout",
    config: {
      defaultVariant: "preview layout",
      maxFileSizeMB: 5,
      acceptedFileTypes: "image/*",
      uploadLabel: "Upload Photo",
      placeholderText: "Click to upload your profile picture",
    },
  },
  {
    title: "Document Management",
    description: "Ideal for file management systems and dashboards",
    variant: "multi-file",
    config: {
      defaultVariant: "multi-file",
      maxFileSizeMB: 25,
      acceptedFileTypes: ".pdf,.doc,.docx,.txt",
      uploadLabel: "Upload Documents",
      placeholderText: "Drag and drop your documents here",
      allowMultipleFiles: true,
      maxFiles: 10,
    },
  },
  {
    title: "Image Gallery",
    description: "Great for photo galleries and content management",
    variant: "drag-and-drop",
    config: {
      defaultVariant: "drag-and-drop",
      maxFileSizeMB: 15,
      acceptedFileTypes: "image/*",
      uploadLabel: "Add Images",
      placeholderText: "Drop your images here or click to browse",
      allowMultipleFiles: true,
      maxFiles: 20,
    },
  },
  {
    title: "Simple File Upload",
    description: "Basic file upload for forms and applications",
    variant: "button",
    config: {
      defaultVariant: "button",
      maxFileSizeMB: 10,
      acceptedFileTypes: "*/*",
      uploadLabel: "Choose File",
      placeholderText: "Select a file to upload",
    },
  },
];
