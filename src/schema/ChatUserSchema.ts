import { z } from "zod";
import { UserSchema } from "./userSchema";

export const ChatUserSchema = UserSchema.extend({
  profilePicture: z.string({
    required_error: "Profile Picture is missing",
  }),
});

export type IChatUser = z.infer<typeof ChatUserSchema>;
