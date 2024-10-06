import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import React from "react";

const FileUploadIndicator = ({
  indicatorClass,
}: {
  indicatorClass?: string;
}) => {
  return (
    <div
      className={cn(
        `absolute bottom-[0px] right-[10%] flex h-10 w-10 select-none items-center justify-center rounded-full border-2 border-theme-bg-color bg-theme-color p-2 text-white transition-opacity duration-500`,
        indicatorClass,
      )}
    >
      <Camera />
    </div>
  );
};

export default FileUploadIndicator;
