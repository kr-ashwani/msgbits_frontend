import React, { useState, useCallback, useEffect } from "react";
import { SafeImage } from "@/components/utility/SafeImage";

interface FilePreviewProps {
  file: File;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const formatSize = useCallback((bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    const k = 1024;
    const sizes = ["KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i - 1];
  }, []);

  const getFileIcon = useCallback(() => {
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type.startsWith("video/")) return "🎥";
    if (file.type.startsWith("audio/")) return "🎵";
    return "📄";
  }, [file.type]);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  if (file.type.startsWith("image/") && preview) {
    return (
      <div className="relative h-full w-full">
        <SafeImage
          src={preview}
          alt={file.name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-lg"
        />
      </div>
    );
  }

  if (file.type.startsWith("video/") && preview) {
    return (
      <div className="relative h-full w-full">
        <video
          className="absolute left-0 top-0 h-full w-full rounded-lg"
          controls
        >
          <source src={preview} type={file.type} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex w-full items-center overflow-hidden rounded-lg p-4 shadow">
      <span className="mr-4 flex-shrink-0 text-3xl">{getFileIcon()}</span>
      <div className="min-w-0 flex-grow">
        <p className="truncate font-semibold">{file.name}</p>
        <p className="text-gray-500 text-sm">{formatSize(file.size)}</p>
      </div>
    </div>
  );
};

export default FilePreview;
