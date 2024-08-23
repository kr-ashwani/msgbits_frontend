import React from "react";
import SliderHeader from "./SliderHeader";

const GroupChatCreate = ({ name }: { name: string }) => {
  return (
    <div className="h-full bg-theme-bg-color">
      <SliderHeader heading="Create Group" closingSliderName={name} />
    </div>
  );
};

export default GroupChatCreate;
