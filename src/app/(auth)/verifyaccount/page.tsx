"use client";
import Button from "@/components/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { setUser } from "@/lib/store/features/auth/authSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { UserSchema } from "@/schema/userSchema";
import { fetchData } from "@/utils/custom/customFetch";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const VerifyAccount = () => {
  const otp = useRef("");
  const query = useAppSelector((state) => state.query);
  const dispatch = useDispatch();
  async function verifOTP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(otp.current.length);
    if (otp.current.length !== 6)
      return toastDelegate.error(
        "Validation Error: OTP must be of six digits.",
      );
    if (!query.email)
      return toastDelegate.error("Validation Error: Email address is missing.");
    console.log(otp.current, query.email);
    const response = await fetchData(
      "/fetchData",
      serverResWapperSchema(UserSchema),
      {
        otp: otp.current,
        email: query.email,
      },
    );
    if (!response.success)
      return toastDelegate.error(response.errCode + response.error);

    toastDelegate.success(
      `${response.payload.data.name}, You have logged in successfully`,
    );
    dispatch(setUser(response.payload.data));
  }
  return (
    <main className="mb-20 mt-14 flex flex-col items-center gap-12 px-4">
      <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
        OTP Verification
      </h2>
      <form onSubmit={verifOTP}>
        <div className="flex flex-col items-center gap-10">
          <p className="text-center font-montserrat text-lg">
            Please enter the OTP sent to your Email to verify your Account.
          </p>
          <InputOTP onChange={(data) => (otp.current = data)} maxLength={6}>
            <InputOTPGroup className="font-roboSlab font-medium">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="font-roboSlab font-medium">
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="font-roboSlab font-medium">
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button>Verify OTP</Button>
        </div>
      </form>
    </main>
  );
};

export default VerifyAccount;
