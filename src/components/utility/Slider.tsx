import React, { ReactNode } from "react";
import SliderHeader from "./SliderHeader";
import { cn } from "@/lib/utils";

const Slider = ({
  name,
  children,
  heading,
  className,
}: {
  name: string;
  children: ReactNode;
  heading: string;
  className?: string;
}) => {
  return (
    <div className="flex h-full flex-col gap-5 bg-chat-bg">
      <SliderHeader heading={heading} closingSliderName={name} />
      <div className={cn("overflow-y-auto", className)}>{children}</div>
    </div>
  );
};

export default Slider;
