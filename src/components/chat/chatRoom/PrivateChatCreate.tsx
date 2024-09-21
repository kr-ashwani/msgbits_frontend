import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useChatUserState } from "@/hooks/AppSelector/useChatUserState";
import { IUser } from "@/schema/userSchema";
import React, { useEffect, useMemo, useState } from "react";
import { sleep } from "@/components/StackSlider/utils/sleep";
import { SLIDING_TIME } from "@/components/StackSlider/StatckSlider";
import { useChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import Slider from "../../utility/Slider";
import StatusAvatar from "../chatUser/StatusAvatar";

const PrivateChatCreate = ({ name }: { name: string }) => {
  const slider = useSlide();
  const chatuser = useChatUserState();
  const selectChatDispatch = useSelectedChatDispatch();
  const [searchUser, setSearchUser] = useState("");
  const [chatUserList, setChatUserList] = useState<IUser[]>([]);
  const chatRoomContainer = useChatRoomState();

  const originalChatUserList = useMemo(
    () => chatuser.getAllUsersExceptItself(),
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

  return (
    <Slider heading="Select User" name={name} className="flex flex-col gap-5">
      <div
        className="flex cursor-pointer items-center gap-3 px-3"
        onClick={async () => {
          slider.trigerSlider("open", "GroupChatCreate");

          await sleep(SLIDING_TIME);
          slider.trigerSlider("close", name);
        }}
      >
        <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-theme-color text-white">
          {ChatSvg("groupChatIcon", { height: "30", width: "30" })}
        </div>
        <p className="text-[16px] font-semibold"> New Group Chat</p>
      </div>

      <div className="mb-3 px-3">
        <p className="text-[16px] font-semibold text-msg-message">
          Tap to start chatting
        </p>
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
              onClick={async () => {
                const chatRoomId = chatRoomContainer.getPrivateChatWithMemberId(
                  user._id,
                );
                selectChatDispatch.setSelectedChat(chatRoomId || user._id);
                const body = document.getElementsByTagName("body")[0];
                if (body && body.offsetWidth <= 768) await sleep(SLIDING_TIME);
                slider.trigerSlider("close", name);
              }}
              key={user._id}
              className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
            >
              <StatusAvatar
                userId={user._id}
                src={user.profilePicture}
                size={45}
              />
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
    </Slider>
  );
};

export default PrivateChatCreate;
