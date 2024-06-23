"use client";
import Image from "next/image";
import React, { useState } from "react";
import AuthPassword from "/public/icons/AuthPassword.svg";
import PasswordEyeClose from "/public/icons/PasswordEyeClose.svg";
import PasswordEyeOpen from "/public/icons/PasswordEyeOpen.svg";
import { twMerge } from "tailwind-merge";

const PasswordInput = (props: { placeholder?: string; className?: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <label
      className={twMerge(
        "relative mt-[-10px] w-full rounded-full bg-white-200 px-12 py-3 text-base font-medium",
        props.className,
      )}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Image width={25} src={AuthPassword} alt="user icon"></Image>
      </span>
      <input
        placeholder={props.placeholder || "Password"}
        className="placeholder:text-slate-600 bg-white-200 focus:outline-none"
        type={showPassword ? "text" : "password"}
        name=""
        id=""
      />
      <span
        onClick={() => setShowPassword((state) => !state)}
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center justify-center pr-4"
      >
        <Image
          width={25}
          src={showPassword ? PasswordEyeOpen : PasswordEyeClose}
          alt="user icon"
        ></Image>
      </span>
    </label>
  );
};

export default PasswordInput;
