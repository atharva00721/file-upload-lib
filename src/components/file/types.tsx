type FileUploaderConfig = {
  variant?:
    | "button"
    | "drag-and-drop"
    | "preview layout"
    | "image-only"
    | "multi-file";
  size?: "sm" | "md" | "lg" | "xl";
  style?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  maxSizeMB?: number;
  accept?: string;
  placeholder?: string;
  uploadLabel?: string;
  maxFiles?: number;
  customStyle?: {
    width?: string;
    height?: string;
    border?: string;
    rounded?: string;
    backgroundColor?: string;
    textColor?: string;
  };
};

type FileItem = {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
};
