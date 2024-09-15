import React from "react";
import Slider from "@/components/utility/Slider";

const Setting = ({ name }: { name: string }) => {
  return (
    <Slider heading="Setting" name={name} className="flex flex-col gap-5">
      {null}
    </Slider>
  );
};

export default Setting;
