import { z } from "zod";

export const UserSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Password is required",
    })
    .email(),
  createdAt: z.string({
    required_error: "createdAt is required",
  }),
  updatedAt: z.string({
    required_error: "updatedAt is required",
  }),
  _id: z.string({
    required_error: "_id is required",
  }),
  profilePicture: z.string({
    required_error: "Profile picture is required",
  }),
});

export const OAuthUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  profilePicture: z.string(),
  isVerified: z.boolean(),
});

export type IUser = z.infer<typeof UserSchema>;
