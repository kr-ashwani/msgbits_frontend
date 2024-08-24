import React, { useEffect, useMemo, useState } from "react";
import SliderHeader from "./SliderHeader";
import { ChatSvg } from "@/components/svg/chatSvg";
import UserAvatar from "@/components/utility/UserAvatar";
import { useChatUserState } from "@/hooks/AppSelector/useChatUserState";
import { IUser } from "@/schema/userSchema";
import GroupChatNewMembers from "./GroupChatNewMembers";
import { NewGroupType } from "./ChatRoomWrapper";
import useSlide from "@/components/StackSlider/hooks/useSlide";

export function setNewGroupList(userList: IUser[], user: IUser): IUser[] {
  const userExists = userList.some((member) => member._id === user._id);

  if (userExists) {
    return userList.filter((member) => member._id !== user._id);
  } else {
    return [...userList, user];
  }
}

const GroupChatCreate = ({
  name,
  newGroup,
  setNewGroup,
}: {
  name: string;
  newGroup: NewGroupType;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupType>>;
}) => {
  const chatuser = useChatUserState();
  const slider = useSlide();
  const [searchUser, setSearchUser] = useState("");
  const [chatUserList, setChatUserList] = useState<IUser[]>([]);
  const originalChatUserList = useMemo(
    () => chatuser.getAllUsers(),
    [chatuser],
  );

  useEffect(() => {
    if (searchUser)
      setChatUserList(
        originalChatUserList.reduce<IUser[]>((acc, user) => {
          if (
            user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.email
              .split("@")[0]
              .toLowerCase()
              .includes(searchUser.toLowerCase())
          )
            acc.push(user);
          return acc;
        }, []),
      );
    else setChatUserList(originalChatUserList);
  }, [originalChatUserList, searchUser, setChatUserList]);

  useEffect(() => {
    // reset newGroup on component first mount
    setNewGroup({
      name: "",
      members: [],
    });
  }, [setNewGroup]);
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto bg-chat-bg">
      <SliderHeader heading="Create Group" closingSliderName={name} />

      {newGroup.members.length ? (
        <div
          onClick={() => slider.trigerSlider("open", "GroupChatFinalCreate")}
          className="absolute bottom-5 right-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-color text-white"
        >
          {ChatSvg("rightArrow")}
        </div>
      ) : null}

      <GroupChatNewMembers newGroup={newGroup} setNewGroup={setNewGroup} />
      <div className="mb-3 px-3">
        <div className="relative pt-3 text-setting-icon-color">
          <div className="absolute pt-1">
            {ChatSvg("search", { width: "20px", height: "20px" })}
          </div>
          <input
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="w-full border-none px-2 pl-7 text-[15px] font-semibold text-body-color outline-none"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {chatUserList.map((user) => {
          return (
            <div
              onClick={() =>
                setNewGroup((state) => ({
                  ...state,
                  members: setNewGroupList(state.members, user),
                }))
              }
              key={user._id}
              className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
            >
              <div className="relative">
                <UserAvatar src={user.profilePicture} size={45} />
                {newGroup.members.some((member) => member._id === user._id) ? (
                  <>
                    <div className="absolute inset-0 rounded-full bg-theme-color text-white opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-full text-white">
                      {ChatSvg("checkIcon")}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="flex flex-col overflow-hidden">
                <p className="truncate text-[16px] font-semibold">
                  {user.name}
                </p>
                <p className="truncate text-sm font-medium text-msg-message">
                  {user.email}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-5"></div>
    </div>
  );
};

export default GroupChatCreate;
