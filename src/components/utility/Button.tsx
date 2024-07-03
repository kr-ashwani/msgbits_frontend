"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

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
        `btn-primary hover:bg-gradient-button-hover focus:bg-gradient-button-click group relative ring-slate-300 ring-offset-1 active:ring-1 disabled:text-opacity-0`,
        props.className,
      )}
    >
      <span className="flex items-center justify-center gap-2 before:absolute before:inset-0 before:hidden before:w-full before:items-center before:justify-center before:pt-[8px] before:text-center before:content-[url('/icons/loading.svg')] group-disabled:before:flex">
        {props.children}
      </span>
    </button>
  );
};

export default Button;
