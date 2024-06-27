import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IUser = z.infer<typeof UserSchema>;
