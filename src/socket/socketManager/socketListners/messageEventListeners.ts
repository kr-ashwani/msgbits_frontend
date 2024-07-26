import { Socket } from "socket.io-client";
import { ListenerMapping } from "../types";
import { MessageSchema } from "@/schema/MessageSchema";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { z } from "zod";

export function setUpMessageEventListenerWithValidation<
  K extends keyof ListenerMapping,
>(socket: Socket, event: K, callback: ListenerMapping[K]) {
  if (event === "message-create") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["message-create"];
    socket.on(event as string, (payload) => {
      const result = MessageSchema.safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send newly created Message data",
        );
    });
  } else if (event === "message-update") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["message-update"];
    socket.on(event as string, (payload) => {
      const result = MessageSchema.safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send updated Message data",
        );
    });
  } else if (event === "message-chatroom") {
    // typescript is unable to infer callback properly
    const callbackFn = callback as ListenerMapping["message-chatroom"];
    socket.on(event as string, (payload) => {
      const result = z
        .object({ string: z.array(MessageSchema) })
        .safeParse(payload);
      if (result.success) callbackFn(result.data);
      else
        toastDelegate.error(
          "ValidationError: server did not correctly send ChatRoom Messages data",
        );
    });
  }
}
