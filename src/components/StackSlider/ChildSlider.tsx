import React, { ReactNode, useEffect, useRef, useState } from "react";
import { sleep } from "./utils/sleep";
import useRightSwipeToggle from "./hooks/useRightSwipeToggle";
import { cn } from "./utils/utils";

interface ChildSliderProps {
  children: ReactNode;
  slideName: string;
  childStackClass: string;
  trigerSlider: (state: "open" | "close", sliderName: string) => Promise<void>;
}

const ChildSlider = ({
  children,
  slideName,
  childStackClass,
  trigerSlider,
}: ChildSliderProps) => {
  const childSlide = useRef<HTMLDivElement>(null);
  useRightSwipeToggle(childSlide, (state) => {
    if (state) trigerSlider("close", slideName);
  });
  const [showSlide, setShowSlide] = useState(false);
  useEffect(() => {
    async function translate() {
      await sleep(0);
      setShowSlide(true);
    }
    translate();
  }, []);
  return (
    <div
      id={`stackSlider__${slideName}__`}
      ref={childSlide}
      className={cn(
        `${
          showSlide ? "translate-x-0" : "translate-x-full"
        } duration-stack-sliding-time ease-stack-slider-fnc absolute inset-0 transition`,
        childStackClass,
      )}
    >
      {children}
    </div>
  );
};

export default ChildSlider;
