"use client";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import Button from "../utility/Button";
import Input from "./Input";
import { toast } from "@/utils/toast/Toast";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ILoginUser,
  ISignupUser,
  loginUserSchema,
  signupUserSchema,
} from "@/schema/AuthUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchData } from "@/utils/custom/customFetch";
import { UserSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { setUser } from "@/lib/store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { setQueryEmail } from "@/lib/store/features/query/querySlice";
import useDisplayFormError from "@/hooks/useDisplayFormError";
import { useEffect } from "react";

const AuthForm = (props: { AuthType: "Login" | "Signup" }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const oppositeAuthType = props.AuthType === "Login" ? "Signup" : "Login";
  //ILoginUser | ISignupUser is Discriminated unions
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ILoginUser | ISignupUser>({
    resolver: zodResolver(
      props.AuthType === "Login" ? loginUserSchema : signupUserSchema,
    ),
  });

  useDisplayFormError(errors);
  const onSubmit: SubmitHandler<ILoginUser | ISignupUser> = async (data) => {
    let response;
    // checking on the basis of Discriminated unions tag
    if (data.authType === "Login") {
      response = await fetchData(
        "/login",
        serverResWapperSchema(UserSchema),
        data,
      );
      if (!response.success) {
        if (response.errCode === "Email Verification Error") {
          toast.warning(
            "User must verify their account with an OTP sent to their email.",
          );
          dispatch(setQueryEmail(data.email));
          return router.push("/verifyaccount");
        } else return toast.error(response.error);
      }
      toast.success(
        `${response.payload.data.name}, You have logged in successfully`,
      );
      dispatch(setUser(response.payload.data));
    } else {
      //random profile pic link
      const profilePicture = `https://avatar.iran.liara.run/public/${Math.random() > 0.5 ? "boy" : "girl"}?username=${data.name}`;
      response = await fetchData("/signup", serverResWapperSchema(UserSchema), {
        ...data,
        profilePicture,
      });
      if (!response.success) return toast.error(response.error);

      toast.success(
        `${response.payload.data.name}, Your account has been created successfully. Please verify the OTP to complete the verification process`,
      );
      dispatch(setQueryEmail(response.payload.data.email));
      router.push("/verifyaccount");
    }
  };

  useEffect(() => {
    // setting Discriminated unions tag
    setValue("authType", props.AuthType, { shouldValidate: true });
  }, [setValue, props.AuthType]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-6 px-5 font-montserrat sm:px-1"
    >
      {props.AuthType === "Signup" ? (
        <Input type="name" register={register} />
      ) : null}
      <Input type="email" register={register} />
      <PasswordInput
        autoComplete={
          props.AuthType === "Login" ? "current-password" : "new-password"
        }
        type="password"
        register={register}
      />
      {props.AuthType === "Signup" ? (
        <PasswordInput
          autoComplete="new-password"
          type="confirmPassword"
          register={register}
          placeholder="Confirm Password"
        />
      ) : null}

      <p className="text-right">
        <Link
          className="text-right font-roboSlab font-medium text-yellow-600"
          href={"/forgotpassword"}
        >
          Forget Password?
        </Link>
      </p>

      <Button disabled={isSubmitting} className="mx-16">
        {props.AuthType}
      </Button>
      <p className="mt-[-8px] text-center font-roboSlab">
        Already have an Account?
        <Link
          className="pl-2 font-medium text-yellow-600"
          href={`/${oppositeAuthType.toLocaleLowerCase()}`}
        >
          {oppositeAuthType}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
