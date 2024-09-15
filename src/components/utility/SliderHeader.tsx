import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import React from "react";

const SliderHeader = ({
  heading,
  closingSliderName,
}: {
  heading: string;
  closingSliderName: string;
}) => {
  const slider = useSlide();
  return (
    <div className="flex items-center border-b-[1px] border-border-color bg-chat-bg py-3">
      <div
        className="ml-[-8px] cursor-pointer pl-3"
        onClick={() => slider.trigerSlider("close", closingSliderName)}
      >
        {ChatSvg("backArrow")}
      </div>

      <p className="pl-1 text-xl font-semibold">{heading}</p>
    </div>
  );
};

export default SliderHeader;
