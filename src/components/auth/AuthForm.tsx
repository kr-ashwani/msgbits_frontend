"use client";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import Button from "../Button";
import Input from "./Input";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ILoginUser,
  ISignupUser,
  loginUserSchema,
  signupUserSchema,
} from "@/schema/AuthUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { fetchData } from "@/utils/custom/customFetch";
import { UserSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { setUser } from "@/lib/store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { setQueryEmail } from "@/lib/store/features/query/querySlice";

const AuthForm = (props: { AuthType: "Login" | "Signup" }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const oppositeAuthType = props.AuthType === "Login" ? "Signup" : "Login";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginUser | ISignupUser>({
    resolver: zodResolver(
      props.AuthType === "Login" ? loginUserSchema : signupUserSchema,
    ),
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      let errStr = "";
      Object.values(errors).forEach(
        (err) => (errStr = errStr.concat(err?.message || "").concat("; ")),
      );
      toastDelegate.error(`Validation Error: ${errStr}`);
    }
  }, [errors]);
  const onSubmit: SubmitHandler<ILoginUser | ISignupUser> = async (data) => {
    let response;

    if (props.AuthType === "Login") {
      response = await fetchData(
        "/login",
        serverResWapperSchema(UserSchema),
        data,
      );
      if (!response.success) return toastDelegate.error(response.error);
      toastDelegate.success(
        `${response.payload.data.name}, You have logged in successfully`,
      );
      dispatch(setUser(response.payload.data));
    } else {
      response = await fetchData(
        "/signup",
        serverResWapperSchema(UserSchema),
        data,
      );
      if (!response.success) return toastDelegate.error(response.error);

      toastDelegate.success(
        `${response.payload.data.name}, Your account has been created successfully. Please verify the OTP to complete the verification process`,
      );
      dispatch(setQueryEmail(response.payload.data.email));
      router.push("/verifyaccount");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-10 px-5 font-montserrat sm:px-1"
    >
      {props.AuthType === "Signup" ? (
        <Input type="name" register={register} />
      ) : null}
      <Input type="email" register={register} />
      <PasswordInput type="password" register={register} />
      {props.AuthType === "Signup" ? (
        <PasswordInput
          type="confirmPassword"
          register={register}
          placeholder="Confirm Password"
        />
      ) : null}

      <Link
        className="mb-[-15px] text-right font-roboSlab font-medium text-yellow-600"
        href={"/forgotpassword"}
      >
        Forget Password?
      </Link>

      <Button disabled={isSubmitting} className="mx-16 mb-[-20px]">
        {props.AuthType}
      </Button>
      <p className="text-center font-roboSlab">
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
