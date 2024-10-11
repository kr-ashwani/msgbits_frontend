import React, { useEffect, useRef, useState } from "react";
import { NewGroupType } from "./ChatRoomWrapper";
import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import AvatarUpdatable from "@/components/utility/AvatarUpdatable";
import { sleep } from "@/components/StackSlider/utils/sleep";
import { SLIDING_TIME } from "@/components/StackSlider/StatckSlider";
import GroupChatNewMembers from "./GroupChatNewMembers";
import { useChatService } from "@/hooks/chat/useChatService";
import Slider from "../../utility/Slider";
import { toast } from "@/utils/toast/Toast";
import { uploadFileToServer } from "@/utils/custom/uploadFileToServer";

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

  function handleGroupChatCreation(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();

    const members = newGroup.members.map((memb) => memb._id);

    if (!members.length)
      return toast.error("Group must have atleast one member");
    if (!newGroup.name.trim())
      return toast.error("Group must have a valid name");
    if (!chatRoomPicture)
      return toast.error("Group must have a valid chat room picture");

    chatService.createNewGroupChat({
      chatName: newGroup.name.trim(),
      chatRoomPicture,
      members,
    });
    slider.trigerSlider("close");
  }

  function handleGroupName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewGroup((state) => ({
      ...state,
      name: state.name.trim() ? e.target.value : e.target.value.trim(),
    }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    await uploadFileToServer(Array.from(e.target.files));
  }
  return (
    <Slider
      heading="Group Description"
      name={name}
      className="flex flex-col gap-5"
    >
      {newGroup.name.trim() && newGroup.members.length ? (
        <div
          onClick={() => handleGroupChatCreation()}
          className="theme-color-Animation absolute bottom-5 right-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-color text-white"
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
        />

        <input type="file" name="" id="" multiple onChange={handleFileUpload} />
        <div className="mx-4 flex gap-4">
          <p className="text-nowrap font-semibold">Group Name </p>
          <form onSubmit={handleGroupChatCreation} className="h-7 w-0 grow">
            <input
              ref={inputRef}
              value={newGroup.name}
              onChange={handleGroupName}
              className="h-full w-full border-theme-color pb-[2px] text-base font-semibold text-body-color outline-none focus:border-b-[3px]"
              placeholder="Group Name..."
            />
          </form>
        </div>
        <div className="pt-4">
          <p className="text-nowrap px-5 pb-2 font-semibold">Group Members</p>
          <GroupChatNewMembers newGroup={newGroup} setNewGroup={setNewGroup} />
        </div>
      </div>
    </Slider>
  );
};

export default GroupChatFinalCreate;
