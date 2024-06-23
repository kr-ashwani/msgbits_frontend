import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EmailInput from "@/components/auth/EmailInput";
import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <Header nav={{ label: "Home", link: "/" }} />
      <section className="mb-20 mt-14 flex flex-col items-center gap-10 px-4">
        <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
          Reset Your Password
        </h2>
        <div className="flex flex-col items-center gap-10">
          <p className="text-center font-montserrat text-lg">
            Enter your email address to receive a password reset link.
          </p>
        </div>
        <EmailInput className="max-w-sm" />
        <Button navigateTo="#">Send Reset Link</Button>
      </section>
      <Footer />
    </>
  );
};

export default ForgotPassword;
