"use client";
import { DisplayComponent } from "@/app/(protected)/chat/page";
import useLeftSwipeToggle from "@/hooks/useLeftSwipeToggle";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const ChatRoomMessages = ({
  displayComponent,
  setShowChatRoomDetail,
}: {
  displayComponent: DisplayComponent;
  setShowChatRoomDetail: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showComponent, setShowComponent] = useState(false);
  const comp = useRef<HTMLElement>(null);
  useLeftSwipeToggle(comp, displayComponent.setShowchatRoomMessages);
  useEffect(() => {
    displayComponent.setShowchatRoomMessages = setShowComponent;
  }, [displayComponent]);

  return (
    <section
      id="chatRoomMessage"
      ref={comp}
      className={`absolute inset-0 h-full w-full transition-transform ${showComponent ? "max-md:translate-x-0" : "max-md:translate-x-full"} md:relative`}
    >
      <p>Chat Room Messages</p>
      <button
        onClick={() => {
          displayComponent.setShowchatRoomDetails &&
            displayComponent.setShowchatRoomDetails(true);
          setShowChatRoomDetail(true);
        }}
      >
        OPEN
      </button>
      <button
        onClick={() => {
          displayComponent.setShowchatRoomMessages &&
            displayComponent.setShowchatRoomMessages(false);
        }}
      >
        CLOSE
      </button>

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
