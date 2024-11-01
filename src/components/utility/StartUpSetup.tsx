"use client";

import { useChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";
import useIsMobile from "@/hooks/useIsMobile";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useLayoutEffect } from "react";

const StartUpSetup = () => {
  const chatRoomDataDispatch = useChatRoomDataDispatch();
  const themeColor = useAppSelector((state) => state.chat.setting.theme);
  const isMobile = useIsMobile();

  // used layout Effect as we are setting theme color
  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) chatRoomDataDispatch.updateTheme(theme);
  }, [chatRoomDataDispatch]);

  // setting theme data attribute to dom
  useLayoutEffect(() => {
    document.body.setAttribute("data-theme", themeColor);
  }, [themeColor]);

  useEffect(() => {
    const sendEnterToMsg = localStorage.getItem("sendEnterToMsg");
    if (sendEnterToMsg)
      chatRoomDataDispatch.setEnterToSendMsg(
        sendEnterToMsg === "true" ? true : false,
      );
    else chatRoomDataDispatch.setEnterToSendMsg(!isMobile);
  }, [isMobile, chatRoomDataDispatch]);

  return null;
};

export default StartUpSetup;
