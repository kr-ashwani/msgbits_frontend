import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PasswordInput from "@/components/auth/PasswordInput";
import React from "react";

const ResetPassword = () => {
  return (
    <>
      <Header nav={{ label: "Home", link: "/" }} />
      <section className="mb-20 mt-14 flex flex-col items-center gap-10 px-4">
        <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
          Reset Your Password
        </h2>
        <div className="flex flex-col items-center gap-10">
          <p className="text-center font-montserrat text-lg">
            Please enter your new password below.
          </p>
        </div>

        <PasswordInput className="max-w-sm" placeholder="New Password" />
        <PasswordInput
          className="max-w-sm"
          placeholder="Confirm New Password"
        />
        <Button navigateTo="#">Reset Password</Button>
      </section>
      <Footer />
    </>
  );
};

export default ResetPassword;
