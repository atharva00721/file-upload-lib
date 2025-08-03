export type FileUploaderConfig = {
  defaultVariant?:
    | "button"
    | "drag-and-drop"
    | "preview layout"
    | "image-only"
    | "multi-file";
  maxFileSizeMB?: number;
  acceptedFileTypes?: string;
  stylePreset?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  uploadLabel?: string;
  placeholderText?: string;
  allowMultipleFiles?: boolean;
  maxFiles?: number;
  customWidth?: string;
  customHeight?: string;
  customBorder?: string;
  customBorderRadius?: string;
  customBackgroundColor?: string;
  customTextColor?: string;
};

export type VariantOption = {
  value: string;
  label: string;
  description: string;
};

export type StylePresetOption = {
  value: string;
  label: string;
};

export type SizeOption = {
  value: string;
  label: string;
};

export type FileTypeOption = {
  value: string;
  label: string;
};

export type UseCase = {
  title: string;
  description: string;
  variant: string;
  config: FileUploaderConfig;
};
