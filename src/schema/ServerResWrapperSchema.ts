import { z } from "zod";

export const serverResWapperSchema = <T extends z.ZodSchema>(schema: T) => {
  return z.object({
    success: z.boolean().default(true),
    message: z.string(),
    data: schema,
  });
};
