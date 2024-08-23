import React from "react";
import SliderHeader from "../chatRoom/SliderHeader";

const Profile = ({ name }: { name: string }) => {
  return (
    <div className="h-full bg-theme-bg-color">
      <SliderHeader heading="Profile" closingSliderName={name} />
    </div>
  );
};

export default Profile;
