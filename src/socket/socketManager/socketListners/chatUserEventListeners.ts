import { Socket } from "socket.io-client";
import { ListenerMapping } from "../types";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { z } from "zod";
import { ChatUserSchema } from "@/schema/ChatUserSchema";

export function setUpChatUserEventListenerWithValidation<
  K extends keyof ListenerMapping,
>(socket: Socket, event: K, callback: ListenerMapping[K]) {
  if (event === "chatuser-create") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["chatuser-create"];
    const eventHandler = (payload: any) => {
      const result = ChatUserSchema.safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send newly created ChatUser data",
        );
    };
    socket.on(event as string, eventHandler);
    return eventHandler;
  } else if (event === "chatuser-update") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["chatuser-update"];
    const eventHandler = (payload: any) => {
      const result = ChatUserSchema.safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send updated ChatUser data",
        );
    };
    socket.on(event as string, eventHandler);
    return eventHandler;
  } else if (event === "chatuser-getall") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["chatuser-getall"];
    const eventHandler = (payload: any) => {
      const result = z.array(ChatUserSchema).safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send ChatUser data",
        );
    };
    socket.on(event as string, eventHandler);
    return eventHandler;
  }

  return null;
}
