"use client";
import Button from "@/components/utility/Button";
import Input from "@/components/auth/Input";
import useDisplayFormError from "@/hooks/useDisplayFormError";
import { IForgotPassword, forgotPasswordSchema } from "@/schema/AuthUserSchema";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { fetchData } from "@/utils/custom/customFetch";
import { toast } from "@/utils/toast/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useDisplayFormError(errors);
  const onSubmit: SubmitHandler<IForgotPassword> = async (data) => {
    const response = await fetchData(
      "/forgotpassword",
      serverResWapperSchema(z.string()),
      data,
    );
    if (!response.success) return toast.error(response.error);
    toast.success(
      `Password reset mail has been successfully sent to ${data.email}. Follow the instructions in the email to reset your password.`,
    );
  };
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-10"
      >
        <Input register={register} type="email" className="max-w-sm" />
        <Button disabled={isSubmitting} className="self-center" navigateTo="#">
          Send Reset Link
        </Button>
      </form>
    </main>
  );
};

export default ForgotPassword;
