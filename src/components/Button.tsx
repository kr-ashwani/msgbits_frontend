"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

const Button = (props: {
  children: ReactNode;
  className?: string;
  navigateTo?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => any;
}) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={(e) =>
        props.onClick
          ? props.onClick(e)
          : props.navigateTo
            ? router.push(props.navigateTo)
            : ""
      }
      className={cn("btn-primary", props.className)}
    >
      {props.children}
    </button>
  );
};

export default Button;
