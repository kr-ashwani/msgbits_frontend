"use client";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyAccount = () => {
  return (
    <>
      <Header nav={{ label: "Home", link: "/" }} />
      <section className="mb-20 mt-14 flex flex-col items-center gap-12 px-4">
        <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
          OTP Verification
        </h2>
        <div className="flex flex-col items-center gap-10">
          <p className="text-center font-montserrat text-lg">
            Please enter the OTP sent to your Email to verify your Account.
          </p>
          <InputOTP maxLength={6}>
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

          <Button navigateTo="">Verify OTP</Button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default VerifyAccount;
