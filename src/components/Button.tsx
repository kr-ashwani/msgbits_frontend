"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

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
      className={cn("btn-primary", props.className)}
    >
      {props.children}
    </button>
  );
};

export default Button;
