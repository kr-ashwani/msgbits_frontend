import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string()
    .min(6, "Password too short - should be of 6 characters minimum"),
});

export const signupUserSchema = loginUserSchema
  .extend({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1),
    confirmPassword: z.string({
      required_error: "confirmPassword is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPassword did not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password too short - should be of 6 characters minimum"),

    confirmPassword: z.string({
      required_error: "confirmPassword is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPassword did not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ILoginUser = z.infer<typeof loginUserSchema>;
export type ISignupUser = z.infer<typeof signupUserSchema>;
export type IResetPassword = z.infer<typeof resetPasswordSchema>;
export type IForgotPassword = z.infer<typeof forgotPasswordSchema>;
