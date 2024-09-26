import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import ChatMember from "./ChatMember";

const GroupChatMembers = ({
  chatRoomState,
}: {
  chatRoomState: ChatRoomState;
}) => {
  const chatMembers = chatRoomState.getChatRoomMembers();
  const slider = useSlide();

  return (
    <div className="">
      <div className="px-6 py-3">
        <p className="font-semibold">{chatMembers.length} Members</p>
      </div>

      <div>
        {chatRoomState.isChatRoomAdmin() ? (
          <div
            onClick={() => slider.trigerSlider("open", "AddUserToChatRoom")}
            className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
          >
            <div className="relative flex h-10 w-10 items-center justify-center text-theme-color">
              <div className="theme-color-Animation absolute inset-0 rounded-full bg-theme-color opacity-10"></div>
              {ChatSvg("userAddicon")}
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="truncate text-base font-semibold">Add members</p>
            </div>
          </div>
        ) : null}
        {chatMembers.map((member) => (
          <ChatMember
            key={member._id}
            member={member}
            chatRoomState={chatRoomState}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupChatMembers;
