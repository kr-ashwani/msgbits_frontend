"use client";
import Button from "@/components/Button";
import PasswordInput from "@/components/auth/PasswordInput";
import { IResetPassword, resetPasswordSchema } from "@/schema/AuthUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const ResetPassword = () => {
  const { register } = useForm<IResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });
  return (
    <main className="mb-20 mt-14 flex flex-col items-center gap-10 px-4">
      <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
        Reset Your Password
      </h2>
      <div className="flex flex-col items-center gap-10">
        <p className="text-center font-montserrat text-lg">
          Please enter your new password below.
        </p>
      </div>

      <PasswordInput
        type="password"
        register={register}
        className="max-w-sm"
        placeholder="New Password"
      />
      <PasswordInput
        type="confirmPassword"
        register={register}
        className="max-w-sm"
        placeholder="Confirm New Password"
      />
      <Button navigateTo="#">Reset Password</Button>
    </main>
  );
};

export default ResetPassword;
