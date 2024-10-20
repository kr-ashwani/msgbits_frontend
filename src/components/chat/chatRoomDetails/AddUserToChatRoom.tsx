import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import Avatar from "@/components/utility/Avatar";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { IUser } from "@/schema/userSchema";
import { useState, useMemo, useEffect } from "react";
import { NewGroupType } from "../chatRoom/ChatRoomWrapper";
import GroupChatNewMembers from "../chatRoom/GroupChatNewMembers";
import { Dialog } from "@/components/utility/Dialog";
import { useChatService } from "@/hooks/chat/useChatService";
import Slider from "@/components/utility/Slider";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";
import { useImagePreviewDispatch } from "@/hooks/AppDispatcher/useImagePreviewDispatch";

export function setNewGroupList(userList: IUser[], user: IUser): IUser[] {
  const userExists = userList.some((member) => member._id === user._id);

  if (userExists) {
    return userList.filter((member) => member._id !== user._id);
  } else {
    return [...userList, user];
  }
}

const AddUserToChatRoom = ({
  name,
  chatRoomState,
}: {
  name: string;
  chatRoomState: ChatRoomState;
}) => {
  const slider = useSlide();
  const [searchUser, setSearchUser] = useState("");
  const [userList, setUserList] = useState<IUser[]>([]);
  const [newGroup, setNewGroup] = useState<NewGroupType>({
    name: "",
    members: [],
  });
  const originalUserList = useMemo(
    () => chatRoomState.getUsersExceptChatMembers(),
    [chatRoomState],
  );
  const chatService = useChatService();
  const imagePreviewDispatch = useImagePreviewDispatch();

  useEffect(() => {
    if (searchUser)
      setUserList(
        originalUserList.reduce<IUser[]>((acc, user) => {
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
    else setUserList(originalUserList);
  }, [originalUserList, searchUser, setUserList]);

  function handleAddChatRoomUser() {
    chatService.addMoreMembersToChatRoom(
      chatRoomState.chatRoomId,
      newGroup.members,
    );
    slider.trigerSlider("close", name);
  }

  return (
    <Slider heading="Add Members" name={name} className="flex flex-col gap-5">
      {newGroup.members.length ? (
        <Dialog
          description={`Do you want to add ${newGroup.members.length} member${newGroup.members.length === 1 ? "" : "s"} to ${capitalizeStr(chatRoomState.getChatRoomName())} group?`}
          onConfirm={handleAddChatRoomUser}
          cancelButtonText="Go Back"
          confirmButtonText="Add"
        >
          <div className="theme-color-Animation absolute bottom-5 right-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-color text-white">
            {ChatSvg("checkIcon")}
          </div>
        </Dialog>
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
        {userList.map((user) => (
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
              <Avatar
                onClick={(e) => {
                  e.stopPropagation();
                  imagePreviewDispatch.setImagePreview(user.profilePicture);
                }}
                src={user.profilePicture}
                size={45}
              />
              {newGroup.members.some((member) => member._id === user._id) ? (
                <>
                  <div className="theme-color-Animation absolute inset-0 rounded-full bg-theme-color text-white opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-full text-white">
                    {ChatSvg("checkIcon")}
                  </div>
                </>
              ) : null}
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="truncate text-[16px] font-semibold">{user.name}</p>
              <p className="truncate text-sm font-medium text-msg-message">
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5"></div>
    </Slider>
  );
};

export default AddUserToChatRoom;
