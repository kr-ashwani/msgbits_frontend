"use client";
import Button from "@/components/utility/Button";
import PasswordInput from "@/components/auth/PasswordInput";
import useDisplayFormError from "@/hooks/useDisplayFormError";
import { IResetPassword, resetPasswordSchema } from "@/schema/AuthUserSchema";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { UserSchema } from "@/schema/userSchema";
import { fetchData } from "@/utils/custom/customFetch";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const ResetPassword = () => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <ResetPasswordComponent />
    </Suspense>
  );
};

//Nextjs docs useSearchParams must be wrapped around Suspense
const ResetPasswordComponent = () => {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useDisplayFormError(errors);
  const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
    const params = {
      email: searchParams.get("email"),
      code: searchParams.get("code"),
    };
    const response = await fetchData(
      "/resetpassword",
      serverResWapperSchema(UserSchema),
      {
        ...params,
        ...data,
      },
    );
    if (!response.success) return toastDelegate.error(response.error);
    toastDelegate.success(
      `Password has been successfully changed. Please log in `,
    );
  };
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

      <form
        className="flex w-full max-w-sm flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PasswordInput
          type="password"
          register={register}
          className="w-full"
          placeholder="New Password"
          autoComplete="new-password"
        />
        <PasswordInput
          type="confirmPassword"
          register={register}
          className="w-full"
          placeholder="Confirm New Password"
          autoComplete="new-password"
        />
        <Button disabled={isSubmitting} className="self-center">
          Reset Password
        </Button>
      </form>
    </main>
  );
};

export default ResetPassword;
