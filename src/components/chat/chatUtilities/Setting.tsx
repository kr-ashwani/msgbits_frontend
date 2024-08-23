import React from "react";
import SliderHeader from "../chatRoom/SliderHeader";

const Setting = ({ name }: { name: string }) => {
  return (
    <div className="h-full bg-theme-bg-color">
      <SliderHeader heading="Setting" closingSliderName={name} />
    </div>
  );
};

export default Setting;
