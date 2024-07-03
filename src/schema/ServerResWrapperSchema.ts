import { z } from "zod";

export const serverResWapperSchema = <T extends z.ZodSchema>(schema: T) => {
  return z.object({
    success: z
      .boolean({
        required_error: "success is required",
      })
      .default(true),
    message: z.string({
      required_error: "message is required",
    }),
    data: schema,
  });
};
