import React, { useEffect, useRef, useState } from "react";
import { ChatSvg } from "../svg/chatSvg";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  initialValue: string;
  inputType?: "text" | "number";
  onSave?: (p: string) => void;
  inputClassName?: string;
  className?: string;
  initialMode?: "edit" | "save";
}

const AnimatedInput = ({
  initialValue,
  inputType = "text",
  inputClassName = "",
  className = "",
  initialMode = "save",
  onSave,
}: AnimatedInputProps) => {
  const [value, setValue] = useState(initialValue.trim());
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] =
    useState<AnimatedInputProps["initialMode"]>(initialMode);
  const prevValue = useRef(initialValue.trim());

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (mode === "edit") inputRef.current?.focus();
  }, [mode]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    const trimmedValue = value.trim();
    if (onSave && prevValue.current !== trimmedValue) {
      onSave(value);
      prevValue.current = trimmedValue;
    }
    setMode((state) => (state === "edit" ? "save" : "edit"));
    setValue(trimmedValue);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex">
        <div className="grow">
          <form onSubmit={handleSubmit}>
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
          </form>
        </div>
        <div
          className="relative flex w-8 cursor-pointer items-center justify-center"
          onClick={() => handleSubmit()}
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
    </div>
  );
};

export default AnimatedInput;
