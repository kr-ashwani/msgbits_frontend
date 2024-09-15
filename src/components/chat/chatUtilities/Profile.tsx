import React from "react";
import Slider from "@/components/utility/Slider";

const Profile = ({ name }: { name: string }) => {
  return (
    <Slider heading="Profile" name={name} className="flex flex-col gap-5">
      {null}
    </Slider>
  );
};

export default Profile;
