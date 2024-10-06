import { SLIDING_TIME } from "@/components/StackSlider/StatckSlider";
import AnimatedInput from "@/components/utility/AnimatedInput";
import Slider from "@/components/utility/Slider";
import { useChatRoomDispatch } from "@/hooks/AppDispatcher/useChatRoomDispatch";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { useSocket } from "@/hooks/useSocket";
import React, { useEffect, useState } from "react";

const EditChatRoomName = ({
  name,
  chatRoomState,
}: {
  name: string;
  chatRoomState: ChatRoomState;
}) => {
  const rawChatRoom = chatRoomState.getRawChatRoom();
  const [inputMode, setInputMode] = useState<"edit" | "save">("save");
  const chatRoomDispatch = useChatRoomDispatch();
  const { socketQueue } = useSocket();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInputMode("edit");
    }, SLIDING_TIME);
    return () => clearTimeout(timeout);
  }, []);

  function handleSubmit(type: "name", value: string) {
    if (!rawChatRoom) return null;
    const updatedProfile = {
      chatRoomId: rawChatRoom.chatRoomId,
      updatedProfilePicture: null,
      updatedName: value,
    };
    chatRoomDispatch.updateGroupChatProfilePicOrName(updatedProfile);
    socketQueue.emit("chatroom-updateChatNameOrPic", updatedProfile);
  }
  return (
    <Slider heading="Edit ChatRoom Name" name={name} className="">
      <div className="h-52">
        {rawChatRoom && rawChatRoom.type === "group" ? (
          <AnimatedInput
            initialValue={rawChatRoom.chatName}
            inputClassName="text-lg font-semibold w-auto"
            className="shrink-0 p-5"
            initialMode={inputMode}
            onSave={(value) => handleSubmit("name", value)}
          />
        ) : null}
      </div>
    </Slider>
  );
};

export default EditChatRoomName;
