import React, { ReactNode, useEffect, useRef, useState } from "react";
import { sleep } from "./utils/sleep";
import useLeftSwipeToggle from "./hooks/useLeftSwipeToggle";
import { cn } from "./utils/utils";

interface ChildSliderProps {
  children: ReactNode;
  slideName: string;
  childStackClass: string;
  trigerSlider: (state: "open" | "close", sliderName: string) => Promise<void>;
}

const ChildSlider = ({ children, slideName, childStackClass, trigerSlider }: ChildSliderProps) => {
  const childSlide = useRef<HTMLDivElement>(null);
  useLeftSwipeToggle(childSlide, (state) => {
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
        } absolute inset-0 transition duration-stack-sliding-time ease-stack-slider-fnc `,
        childStackClass
      )}
    >
      {children}
    </div>
  );
};

export default ChildSlider;
