import { z } from "zod";

export const StunTurnConfigSchema = z.object({
  stunUrl: z.string({
    required_error: "StunUrl is required",
  }),
  turnUrl: z.string({
    required_error: "turnUrl is required",
  }),
  username: z.string({
    required_error: "username is required",
  }),
  credential: z.string({
    required_error: "credential is required",
  }),
  ttl: z.coerce.number({
    required_error: "ttl is required",
  }),
});

export type IStunTurnConfigSchema = z.infer<typeof StunTurnConfigSchema>;
