"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import Svg from "../svg";

const Input = function <T extends FieldValues>(props: {
  type: Path<T>;
  register: UseFormRegister<T>;
  className?: string;
}) {
  function capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }
  return (
    <label
      className={cn(
        `relative w-full rounded-full bg-white-200 px-12 py-3 text-base font-medium`,
        props.className,
      )}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {Svg("AuthUser", { width: "25" })}
      </span>
      <input
        {...props.register(props.type)}
        placeholder={capitalize(props.type)}
        className="w-full bg-white-200 placeholder:text-slate-600 focus:outline-none"
        type={props.type}
        autoComplete="username"
      />
    </label>
  );
};

export default Input;
