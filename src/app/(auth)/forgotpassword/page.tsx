"use client";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import { IForgotPassword, forgotPasswordSchema } from "@/schema/AuthUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const ForgotPassword = () => {
  const { register } = useForm<IForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  return (
    <main className="mb-20 mt-14 flex flex-col items-center gap-10 px-4">
      <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
        Reset Your Password
      </h2>
      <div className="flex flex-col items-center gap-10">
        <p className="text-center font-montserrat text-lg">
          Enter your email address to receive a password reset link.
        </p>
      </div>
      <Input register={register} type="email" className="max-w-sm" />
      <Button navigateTo="#">Send Reset Link</Button>
    </main>
  );
};

export default ForgotPassword;
