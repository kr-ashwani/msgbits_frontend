import React, { useEffect, useRef, useState } from "react";
import { ChatSvg } from "../svg/chatSvg";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  initialValue: string;
  inputType?: "text" | "number";
  onSave?: (p: string) => void;
  inputClassName?: string;
}

const AnimatedInput = ({
  initialValue,
  inputType = "text",
  inputClassName = "",
  onSave,
}: AnimatedInputProps) => {
  const [value, setValue] = useState(initialValue.trim());
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"edit" | "save">("save");
  const prevValue = useRef(initialValue.trim());

  useEffect(() => {
    if (mode === "edit") inputRef.current?.focus();
  }, [mode]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="relative flex w-full">
      <div className="grow">
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          disabled={mode === "save"}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            `w-full appearance-none bg-theme-bg-color text-base outline-none disabled:cursor-auto disabled:opacity-100`,
            inputClassName,
          )}
        ></input>
      </div>
      <div
        className="relative flex w-8 cursor-pointer items-center justify-center"
        onClick={(e) => {
          const trimmedValue = value.trim();
          if (onSave && prevValue.current !== trimmedValue) {
            onSave(value);
            prevValue.current = trimmedValue;
          }
          setMode((state) => (state === "edit" ? "save" : "edit"));
          setValue(trimmedValue);
        }}
      >
        <div
          className={`absolute transition-opacity duration-500 ${mode === "save" ? "opacity-1" : "opacity-0"}`}
        >
          {ChatSvg("checkIcon", {
            width: "22",
            height: "22",
          })}
        </div>
        <div
          className={`absolute ml-[5px] mt-[-1px] transition-opacity duration-500 ${mode === "save" ? "opacity-0" : "opacity-1"}`}
        >
          {ChatSvg("penIcon", {
            width: "17",
            height: "17",
          })}
        </div>
      </div>
      <div
        className={`absolute -bottom-1 left-0 right-0 h-[2px] origin-left transition-transform duration-300 ${mode === "save" ? "scale-x-0" : "scale-x-1"} rounded-lg bg-theme-color`}
      ></div>
    </div>
  );
};

export default AnimatedInput;
