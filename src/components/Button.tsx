"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = (props: {
  children: ReactNode;
  className?: string;
  navigateTo?: string;
}) => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(props.navigateTo ? props.navigateTo : "/")}
      className={twMerge("btn-primary", props.className)}
    >
      {props.children}
    </button>
  );
};

export default Button;
