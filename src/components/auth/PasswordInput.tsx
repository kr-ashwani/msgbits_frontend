"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import Svg from "../svg";

const PasswordInput = function <T extends FieldValues>(props: {
  type: Path<T>;
  register: UseFormRegister<T>;
  autoComplete: "current-password" | "new-password";
  placeholder?: string;
  className?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <label
      className={cn(
        "relative w-full rounded-full bg-white-200 px-12 py-3 text-base font-medium",
        props.className,
      )}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {Svg("AuthPassword", { width: "25" })}
      </span>
      <input
        {...props.register(props.type)}
        placeholder={props.placeholder || "Password"}
        className="w-full bg-white-200 placeholder:text-slate-600 focus:outline-none"
        type={showPassword ? "text" : "password"}
        autoComplete={props.autoComplete}
      />
      <span
        onClick={() => setShowPassword((state) => !state)}
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center justify-center pr-4"
      >
        {Svg(showPassword ? "PasswordEyeOpen" : "PasswordEyeClose", {
          width: "25",
        })}
      </span>
    </label>
  );
};

export default PasswordInput;
