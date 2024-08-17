"use client";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { useRightSwipeToggle } from "@/hooks/useRightSwipeToggle";
import { useRef } from "react";

const ChatRoomMessages = () => {
  const component = useRef<HTMLElement>(null);
  useRightSwipeToggle(component, null, (state) => {
    if (state) selectedChatDispatch.setSelectedChat(null);
  });
  const selectedChat = useSelectedChatState();
  const selectedChatDispatch = useSelectedChatDispatch();
  const showChatRoomDetailsDispatch = useShowChatRoomDetailsDispatch();

  console.log("chatRoomMessages");

  return (
    <section
      id="chatRoomMessage"
      ref={component}
      className={`absolute inset-0 h-full w-full bg-[--theme-bg-color] transition-transform ${selectedChat.getSelectedChatRoom() ? "max-md:translate-x-0" : "max-md:translate-x-full"} md:relative`}
    >
      <p>Chat Room Messages</p>
      <p
        onClick={() => showChatRoomDetailsDispatch.toggleChatRoomDetails(true)}
      >
        OPEN
      </p>
      <p onClick={() => selectedChatDispatch.setSelectedChat(null)}>CLOSE</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum quas ipsum
        molestiae autem, eveniet perspiciatis reprehenderit eaque natus
        temporibus beatae atque. Dolores tenetur rem sint odit voluptates quos
        obcaecati atque! Totam ad nisi ex neque inventore eveniet fuga quo
        officiis unde saepe ullam nostrum recusandae ratione quaerat quae sed
        consequatur necessitatibus corrupti atque temporibus dolorum quibusdam.
        architecto deserunt accusamus placeat earum libero reiciendis voluptate.
        Ab soluta corrupti eveniet exercitationem hic, architecto quasi
        consequatur eaque neque nesciunt deleniti perferendis aspernatur, ut
        magni excepturi maiores perspiciatis? Eveniet aspernatur quis sit qui
        omnis iste provident eligendi dignissimos error commodi recusandae quae,
        quos quaerat, cum magni fugit veritatis magnam nihil unde quidem
        officiis quibusdam. Temporibus magnam quis facilis. Numquam id aperiam
        aut ipsam tenetur aspernatur quo modi iste autem ex sequi hic possimus,
        nemo voluptatum pariatur! Ab voluptatibus quis iusto commodi dignissimos
        omnis neque facere fugiat consequatur repudiandae! Nemo nostrum minima
        doloremque magni iusto, fuga nobis harum consequatur, consequuntur
        soluta quisquam obcaecati magnam tempora, facere totam saepe mollitia
        sapiente sequi hic vitae itaque? Fuga officiis saepe minus quis? Sed
        ratione soluta est, neque nemo iusto mollitia minima recusandae enim
        obcaecati nam ducimus, consequatur laborum nihil non dolorum maxime
        dolor numquam fugiat impedit eum possimus blanditiis odit. Odit, nisi
        possimus fugit dolor ab id omnis, fugiat amet sunt enim mollitia
        distinctio placeat? Eius inventore possimus maiores sed.
      </p>
    </section>
  );
};

export default ChatRoomMessages;
