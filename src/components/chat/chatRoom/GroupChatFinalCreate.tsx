import React, { useEffect, useRef, useState } from "react";
import SliderHeader from "./SliderHeader";
import { NewGroupType } from "./ChatRoomWrapper";
import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import AvatarUpdatable from "@/components/utility/AvatarUpdatable";
import { sleep } from "@/components/StackSlider/utils/sleep";
import { SLIDING_TIME } from "@/components/StackSlider/StatckSlider";
import GroupChatNewMembers from "./GroupChatNewMembers";
import { useChatService } from "@/hooks/chat/useChatService";

const DefaultUrl = "/assets/groupChat.png";
const GroupChatFinalCreate = ({
  name,
  newGroup,
  setNewGroup,
}: {
  name: string;
  newGroup: NewGroupType;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupType>>;
}) => {
  const slider = useSlide();
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatRoomPicture, setChatRoomPicture] = useState(DefaultUrl);
  const chatService = useChatService();

  useEffect(() => {
    async function focus() {
      if (inputRef.current) {
        await sleep(SLIDING_TIME);
        inputRef.current.focus();
      }
    }
    focus();
  }, []);

  function handleGroupChatCreation() {
    const members = newGroup.members.map((memb) => memb._id);
    chatService.createNewGroupChat({
      chatName: newGroup.name,
      chatRoomPicture,
      members,
    });
    slider.trigerSlider("close");
  }
  return (
    <div className="relativeflex h-full flex-col gap-5 overflow-y-auto bg-chat-bg">
      <SliderHeader heading="Group Description" closingSliderName={name} />

      {newGroup.name && newGroup.members.length ? (
        <div
          onClick={handleGroupChatCreation}
          className="absolute bottom-5 right-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-color text-white"
        >
          {ChatSvg("checkIcon")}
        </div>
      ) : null}
      <div className="flex flex-col gap-8 py-5">
        <AvatarUpdatable
          className="self-center text-white"
          avatarClassName="text-white"
          src={chatRoomPicture}
          setSrc={setChatRoomPicture}
          size={250}
          processImageFn={(e) => {
            return new Promise<string>((res, rej) => {
              const file = e.target.files ? e.target.files[0] : null; // Get the selected file

              if (file) {
                const reader = new FileReader(); // Create a FileReader

                reader.onload = function (e) {
                  const dataURL = e.target?.result; // Data URL of the file
                  if (typeof dataURL === "string") res(dataURL || DefaultUrl);
                  else res(DefaultUrl);
                };

                reader.readAsDataURL(file); // Read the file as a data URL
              } else {
                res(DefaultUrl);
              }
            });
          }}
        />
        <div className="mx-4 flex gap-4">
          <p className="text-nowrap font-semibold">Group Name </p>
          <input
            ref={inputRef}
            value={newGroup.name}
            onChange={(e) =>
              setNewGroup((state) => ({ ...state, name: e.target.value }))
            }
            className="h-7 w-0 grow border-theme-color pb-[2px] text-base font-semibold text-body-color outline-none focus:border-b-[3px]"
            placeholder="Group Name..."
          />
        </div>
        <div className="pt-4">
          <p className="text-nowrap px-5 pb-2 font-semibold">Group Members</p>
          <GroupChatNewMembers newGroup={newGroup} setNewGroup={setNewGroup} />
        </div>
      </div>
    </div>
  );
};

export default GroupChatFinalCreate;
