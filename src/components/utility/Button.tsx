"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import Svg from "../svg";

const Button = (props: {
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  navigateTo?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => any;
}) => {
  const router = useRouter();

  return (
    <button
      disabled={props.disabled}
      onClick={(e) =>
        props.onClick
          ? props.onClick(e)
          : props.navigateTo
            ? router.push(props.navigateTo)
            : ""
      }
      className={cn(
        `btn-primary group relative ring-slate-300 ring-offset-1 hover:bg-gradient-button-hover focus:bg-gradient-button-click active:ring-1 disabled:text-opacity-0`,
        props.className,
      )}
    >
      {props.children}
      {
        <span className="absolute inset-0 hidden items-center justify-center group-disabled:flex">
          {Svg("loading")}
        </span>
      }
    </button>
  );
};

export default Button;
