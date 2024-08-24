import { ChatSvg } from "@/components/svg/chatSvg";
import UserAvatar from "@/components/utility/UserAvatar";
import React from "react";
import { NewGroupType } from "./ChatRoomWrapper";
import { setNewGroupList } from "./GroupChatCreate";

const GroupChatNewMembers = ({
  newGroup,
  setNewGroup,
}: {
  newGroup: NewGroupType;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupType>>;
}) => {
  return newGroup.members.length ? (
    <div className="flex w-full shrink-0 gap-2 overflow-x-auto p-4 py-3 scrollbar-none">
      {newGroup.members.map((member) => (
        <div
          onClick={() =>
            setNewGroup((state) => ({
              ...state,
              members: setNewGroupList(state.members, member),
            }))
          }
          key={member._id}
          className="flex cursor-pointer flex-col gap-2"
        >
          <div className="relative self-center">
            <UserAvatar src={member.profilePicture} size={50} />

            <div className="absolute bottom-[-4px] right-[-4px] rounded-full bg-theme-bg-color p-[2px]">
              <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-theme-color text-white">
                {ChatSvg("xmarkIcon")}
              </div>
            </div>
          </div>

          <div className="w-[70px] overflow-hidden">
            <div className="font truncate text-sm">{member.name}</div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default GroupChatNewMembers;
