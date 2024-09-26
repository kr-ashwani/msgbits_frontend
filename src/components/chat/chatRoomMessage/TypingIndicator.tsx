import { cn } from "@/lib/utils";
import React from "react";

interface TypingIndicatorProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeClasses = {
  small: "h-[4px] w-[4px]",
  medium: "h-[5px] w-[5px]",
  large: "h-[6px] w-[6px]",
};

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  size = "medium",
  className = "",
}) => {
  const dotClasses = `${sizeClasses[size]} rounded-full theme-color-Animation bg-theme-color animate-pulse`;

  return (
    <div
      className={cn(
        className,
        "bg-gray-100 flex items-center space-x-1 rounded-full",
      )}
    >
      <span className={dotClasses}></span>
      <span className={`${dotClasses} animation-delay-150`}></span>
      <span className={`${dotClasses} animation-delay-300`}></span>
    </div>
  );
};

export default TypingIndicator;
