import useSlide from "@/components/StackSlider/hooks/useSlide";
import React from "react";

const GroupChatCreate = ({ name }: { name: string }) => {
  const slider = useSlide();
  return (
    <div className="h-full bg-blue-500">
      <div
        className="cursor-pointer"
        onClick={() => slider.trigerSlider("close", "GroupChatCreate")}
      >
        Back
      </div>
      GroupChatCreate
    </div>
  );
};

export default GroupChatCreate;
