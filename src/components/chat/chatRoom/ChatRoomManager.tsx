import useSlide from "@/components/StackSlider/hooks/useSlide";
import React from "react";

const ChatRoomManager = ({ name }: { name: string }) => {
  const slider = useSlide();
  return (
    <div className="h-60 bg-yellow-400">
      <div className="cursor-pointer" onClick={() => slider.trigerSlider("")}>
        Back
      </div>
      ChatRoomManager
    </div>
  );
};

export default ChatRoomManager;
