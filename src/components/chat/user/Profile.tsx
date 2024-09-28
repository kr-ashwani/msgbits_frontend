import React, { useEffect, useState } from "react";
import Slider from "@/components/utility/Slider";
import Avatar from "@/components/utility/Avatar";
import { useAppSelector } from "@/lib/store/hooks";
import AnimatedInput from "@/components/utility/AnimatedInput";
import { format } from "date-fns";
import { SLIDING_TIME } from "@/components/StackSlider/StatckSlider";
import { UserUpdateProfile } from "@/schema/UserUpdateProfileSchema";
import { useChatUserDispatch } from "@/hooks/AppDispatcher/useChatUserDispatch";
import { useSocket } from "@/hooks/useSocket";

const Profile = ({ name }: { name: string }) => {
  const user = useAppSelector((state) => state.auth.user);
  const { socketQueue } = useSocket();
  const chatUserDispatch = useChatUserDispatch();
  const [toggleAnimation, setToggleAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setToggleAnimation(true);
    }, SLIDING_TIME / 2);
  }, []);

  if (!user) return null;

  const handleSubmit = (
    type: "name" | "profilePicture",
    updateValue: string,
  ) => {
    const updatedProfile: UserUpdateProfile = {
      userId: user._id,
      updatedName: type === "name" ? updateValue : null,
      updatedProfilePicture: type === "profilePicture" ? updateValue : null,
    };

    socketQueue.emit("chatuser-updateProfile", updatedProfile);
    chatUserDispatch.updateUserProfile(updatedProfile);
  };

  return (
    <Slider
      heading="Profile"
      name={name}
      className="overflow-y-auto overflow-x-hidden font-manrope text-sm font-semibold text-detail-font-color"
    >
      <Avatar
        className={`mx-auto mb-14 transition-all duration-500 lg:mb-12 ${toggleAnimation ? "scale-100 opacity-100" : "scale-[0] opacity-0"}`}
        src={user.profilePicture}
        size={230}
      />
      <div
        className={`mx-auto transition-all duration-500 ${toggleAnimation ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"} w-full max-w-md bg-theme-bg-color px-3`}
      >
        <div className="flex border-b-[1px] border-border-color py-[18px] lg:py-[14px]">
          <p className="w-[135px] shrink-0">First Name</p>
          <AnimatedInput
            initialValue={user.name}
            inputClassName="grow text-sm font-semibold "
            onSave={(value) => handleSubmit("name", value)}
          />
        </div>

        <div className="flex border-b-[1px] border-border-color py-[18px] lg:py-[14px]">
          <p className="w-[135px] shrink-0">User Id</p>
          <p className="overflow-y-auto">{user._id}</p>
        </div>

        <div className="flex border-b-[1px] border-border-color py-[18px] lg:py-[14px]">
          <p className="w-[135px] shrink-0">Email address</p>
          <p className="overflow-y-auto">{user.email}</p>
        </div>

        <div className="flex border-b-[1px] border-border-color py-[18px] lg:py-[14px]">
          <p className="w-[135px] shrink-0">Last Signed in</p>
          <p className="overflow-y-auto">
            {format(new Date(user.updatedAt), "do MMMM, yyyy")}
          </p>
        </div>

        <div className="flex border-b-[1px] border-border-color py-[18px] lg:py-[14px]">
          <p className="w-[135px] shrink-0">Created on</p>
          <p className="overflow-y-auto">
            {format(new Date(user.updatedAt), "do MMMM, yyyy")}
          </p>
        </div>
      </div>
    </Slider>
  );
};

export default Profile;
