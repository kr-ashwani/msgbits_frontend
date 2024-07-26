import { Socket } from "socket.io-client";
import { ListenerMapping } from "../types";
import { ChatRoomSchema } from "@/schema/ChatRoomSchema";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { z } from "zod";

export function setUpChatRoomEventListenerWithValidation<
  K extends keyof ListenerMapping,
>(socket: Socket, event: K, callback: ListenerMapping[K]) {
  if (event === "chatroom-create") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["chatroom-create"];
    const eventHandler = (payload: any) => {
      const result = ChatRoomSchema.safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send newly created ChatRoom data",
        );
    };
    socket.on(event as string, eventHandler);
    return eventHandler;
  } else if (event === "chatroom-update") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["chatroom-update"];
    const eventhandler = (payload: any) => {
      const result = ChatRoomSchema.safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send updated ChatRoom data",
        );
    };
    socket.on(event as string, eventhandler);
    return eventhandler;
  } else if (event === "chatroom-getall") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["chatroom-getall"];
    const eventHandler = (payload: any) => {
      const result = z.array(ChatRoomSchema).safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send updated ChatRoom data",
        );
    };
    socket.on(event as string, eventHandler);
    return eventHandler;
  }

  return null;
}
