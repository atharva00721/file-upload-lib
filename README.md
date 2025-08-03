# File Upload Library

A comprehensive file upload component library inspired by Origin UI design patterns. Built with React, TypeScript, and Tailwind CSS with a modern dark theme.

## Features

- 🎨 **14 Variants**: Basic, dropzone, avatar, image grid, image list, file list, table, card, progress, and more
- 🌙 **Dark Theme**: Modern dark UI design inspired by Origin UI
- 📁 **Drag & Drop**: Full drag-and-drop support with visual feedback
- ✅ **File Validation**: Type, size, and count validation
- 📊 **Progress Tracking**: Individual file upload progress with customizable UI
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🎯 **TypeScript**: Fully typed with comprehensive interfaces
- 🚀 **Zero Dependencies**: No external UI library dependencies
- 🎨 **Modern Design**: Clean, minimalist interface with smooth animations

## Installation

```bash
bun install
```

## Quick Start

```tsx
import { FileUploader } from "@/components/file-uploader";

function App() {
  const handleUpload = async (files: File[]) => {
    // Handle file upload
    console.log("Uploading files:", files);
  };

  return (
    <FileUploader
      variant="dropzone"
      title="Upload Files"
      description="Drag and drop or click to browse"
      onFilesSelected={(files) => console.log("Selected:", files)}
      onUpload={handleUpload}
      onError={(error) => console.error(error)}
    />
  );
}
```

## Variants

### Basic Image Uploader

Simple upload button with icon and title.

```tsx
<FileUploader
  variant="basic"
  title="Upload image"
  description="Basic image uploader"
  accept={["image/*"]}
  onUpload={handleUpload}
/>
```

### Avatar Upload Button

Circular avatar upload with plus icon.

```tsx
<FileUploader variant="avatar" accept={["image/*"]} onUpload={handleUpload} />
```

### Dropzone

Drag-and-drop interface with visual feedback.

```tsx
<FileUploader
  variant="dropzone"
  accept={["image/*"]}
  maxSize={5 * 1024 * 1024}
  description="Max size: 5MB"
  onUpload={handleUpload}
/>
```

### Image Grid

Grid layout for multiple image previews.

```tsx
<FileUploader
  variant="imageGrid"
  accept={["image/*"]}
  maxFiles={4}
  title="Uploaded Files"
  onUpload={handleUpload}
/>
```

### Image List

List layout with file details and remove options.

```tsx
<FileUploader
  variant="imageList"
  accept={["image/*"]}
  maxSize={5 * 1024 * 1024}
  description="SVG, PNG, JPG or GIF (max. 5MB)"
  onUpload={handleUpload}
/>
```

### File List

Multiple file upload with comprehensive file info.

```tsx
<FileUploader
  variant="fileList"
  maxFiles={10}
  maxSize={100 * 1024 * 1024}
  title="Upload files"
  description="Drag & drop or click to browse - All files - Max 10 files - Up to 100MB"
  onUpload={handleUpload}
/>
```

### Table

Table layout with file metadata and actions.

```tsx
<FileUploader
  variant="table"
  maxFiles={5}
  title="Files"
  onUpload={handleUpload}
/>
```

### Card

Card layout for mixed file types.

```tsx
<FileUploader
  variant="card"
  maxFiles={5}
  title="Files"
  onUpload={handleUpload}
/>
```

### Progress

File upload with individual progress bars.

```tsx
<FileUploader
  variant="progress"
  maxFiles={5}
  showProgress={true}
  title="Files"
  onUpload={handleUpload}
/>
```

## API Reference

### Props

| Prop              | Type                                                                                                               | Default           | Description                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------- | ------------------------------- |
| `variant`         | `"basic" \| "dropzone" \| "avatar" \| "imageGrid" \| "imageList" \| "fileList" \| "table" \| "card" \| "progress"` | `"basic"`         | The visual style variant        |
| `accept`          | `string[]`                                                                                                         | `["*/*"]`         | Accepted file types             |
| `maxFiles`        | `number`                                                                                                           | `10`              | Maximum number of files         |
| `maxSize`         | `number`                                                                                                           | `10485760` (10MB) | Maximum file size in bytes      |
| `multiple`        | `boolean`                                                                                                          | `true`            | Allow multiple file selection   |
| `showPreview`     | `boolean`                                                                                                          | `false`           | Show file preview               |
| `showProgress`    | `boolean`                                                                                                          | `true`            | Show upload progress            |
| `title`           | `string`                                                                                                           | -                 | Component title                 |
| `description`     | `string`                                                                                                           | -                 | Component description           |
| `disabled`        | `boolean`                                                                                                          | `false`           | Disable the component           |
| `loading`         | `boolean`                                                                                                          | `false`           | Show loading state              |
| `onFilesSelected` | `(files: File[]) => void`                                                                                          | -                 | Called when files are selected  |
| `onUpload`        | `(files: File[]) => Promise<void>`                                                                                 | -                 | Called when upload is triggered |
| `onError`         | `(error: string) => void`                                                                                          | -                 | Called when an error occurs     |
| `className`       | `string`                                                                                                           | -                 | Additional CSS classes          |
| `style`           | `React.CSSProperties`                                                                                              | -                 | Inline styles                   |

### Events

The component provides several callback functions for handling different states:

- **`onFilesSelected`**: Triggered when files are selected (either via file dialog or drag-and-drop)
- **`onUpload`**: Triggered when the upload button is clicked (if provided)
- **`onError`**: Triggered when file validation fails or upload errors occur

## Examples

### Basic File Upload

```tsx
<FileUploader
  variant="basic"
  title="Upload Files"
  onFilesSelected={(files) => console.log("Selected:", files)}
  onUpload={async (files) => {
    // Upload logic here
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }}
/>
```

### Image Upload with Validation

```tsx
<FileUploader
  variant="dropzone"
  accept={["image/*"]}
  maxSize={5 * 1024 * 1024} // 5MB
  multiple={false}
  title="Upload Profile Picture"
  description="PNG, JPG, GIF up to 5MB"
  onError={(error) => alert(error)}
  onUpload={async (files) => {
    // Handle image upload
  }}
/>
```

### Multiple Files with Progress

```tsx
<FileUploader
  variant="progress"
  accept={[
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]}
  maxFiles={5}
  maxSize={10 * 1024 * 1024} // 10MB
  title="Upload Documents"
  description="PDF, DOC, DOCX up to 10MB each"
  showProgress={true}
  onUpload={async (files) => {
    // Upload with progress tracking
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      await fetch("/api/upload-document", {
        method: "POST",
        body: formData,
      });
    }
  }}
/>
```

### Table Layout with Actions

```tsx
<FileUploader
  variant="table"
  maxFiles={10}
  title="Project Files"
  onFilesSelected={(files) => console.log("Selected:", files)}
  onUpload={async (files) => {
    // Handle upload with table view
  }}
/>
```

## Customization

### CSS Classes

The component uses Tailwind CSS classes with a dark theme that can be customized:

```css
/* Custom styles for the uploader */
.custom-uploader {
  @apply bg-gray-800 border-gray-700;
}

.custom-uploader:hover {
  @apply border-gray-600 bg-gray-750;
}
```

### Custom Variants

You can create custom variants by extending the component:

```tsx
const CustomFileUploader = ({ className, ...props }) => (
  <FileUploader
    className={cn("custom-styles", className)}
    variant="dropzone"
    {...props}
  />
);
```

### Custom Icons

```tsx
<FileUploader variant="basic" title="Custom Upload" onUpload={handleUpload} />
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Demo

Visit `/demo` to see all 14 variants and features in action with the modern dark theme design.
