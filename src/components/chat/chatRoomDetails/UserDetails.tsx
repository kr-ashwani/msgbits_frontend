import { ChatSvg } from "@/components/svg/chatSvg";
import Avatar from "@/components/utility/Avatar";
import React from "react";
import PrivateChatCommonGroups from "./PrivateChatCommonGroups";
import { IUser } from "@/schema/userSchema";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";

const UserDetails = ({ user }: { user: IUser }) => {
  function getJoinedDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  return (
    <div className="flex h-full shrink-0 flex-col gap-2 overflow-y-auto py-7">
      <div className="flex flex-col items-center gap-[10px] px-7">
        <div>
          <Avatar src={user.profilePicture || ""} size={120} />
        </div>
        <div className="text-lg font-semibold">{capitalizeStr(user.name)}</div>
        <div className="mt-[-5px] text-xs font-semibold text-msg-date">{`Joined on ${getJoinedDate(user.createdAt)}`}</div>
        <div className="mt-[10px] flex w-full gap-2 text-theme-color">
          <div className="relative flex w-0 grow cursor-pointer items-center justify-center gap-2 py-3 text-sm font-medium">
            <div className="absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
            {ChatSvg("callIcon")}
            <span>Call Group</span>
          </div>
          <div className="relative flex w-0 grow cursor-pointer items-center justify-center gap-2 py-3 text-sm font-medium">
            <div className="absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
            {ChatSvg("videoIcon")}
            <span>Video Chat</span>
          </div>
        </div>
      </div>

      <div className="relative mx-6 flex pt-3 text-setting-icon-color">
        <input
          className="w-0 grow border-b-[1px] border-border-color py-3 pr-6 text-[15px] font-semibold text-body-color outline-none"
          placeholder="Search in Conversation"
        />
        <div className="absolute right-0 self-center">
          {ChatSvg("search", { width: "20px", height: "20px" })}
        </div>
      </div>

      <PrivateChatCommonGroups memberId={user._id} />

      <div className="h-16 w-full shrink-0"></div>
    </div>
  );
};

export default UserDetails;
