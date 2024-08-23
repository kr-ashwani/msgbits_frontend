import React, { ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import getChildren from "./getChildren";
import { sleep } from "./utils/sleep";
import ChildSlider from "./ChildSlider";
import { cn } from "./utils/utils";

const SLIDING_TIME = 300;
const SLIDER_FNC = "cubic-bezier(0.12, 0.8, 0.32, 1)";

export const StackSliderContext = React.createContext({
  trigerSlider: (state: "open" | "close", sliderName: string): void => {},
});

const StackSlider = ({
  children,
  mainStackClass = "w-full",
  childStackClass = "bg-stackSlide",
  stackContainerClass = "bg-stackSlide",
}: {
  children: ReactNode;
  stackContainerClass?: string;
  mainStackClass?: string;
  childStackClass?: string;
}) => {
  const [activeSlides, setActiveSlides] = useState<string[]>([]);
  const mainStack = useRef<ReactNode[]>([]);
  const parentSlide = useRef<HTMLDivElement>(null);
  const slides = useRef<{ [p in string]: ReactNode }>({});

  useMemo(() => getChildren({ children, slides, mainStack }), [children]);

  async function trigerSlider(state: "open" | "close", sliderName: string) {
    if (state === "open") {
      setActiveSlides((state) => {
        if (state.includes(sliderName)) return state;
        return [...state, sliderName];
      });
    } else {
      const slider = document.getElementById(`stackSlider__${sliderName}__`);
      if (slider) slider.style.transform = "translateX(100%)";
      await sleep(SLIDING_TIME);
      setActiveSlides((state) => state.filter((name) => name !== sliderName));
    }
  }

  useEffect(() => {
    // add sliding time and fuction to root
    document.documentElement.style.setProperty("--stack-sliding-time", `${SLIDING_TIME}ms`);
    document.documentElement.style.setProperty("--stack-slider-fnc", SLIDER_FNC);
  }, []);

  const value = { trigerSlider };

  useEffect(() => {}, [activeSlides]);

  return (
    <StackSliderContext.Provider value={value}>
      <div className={cn(` relative overflow-hidden`, stackContainerClass)}>
        <div
          ref={parentSlide}
          className={cn(
            ` transition relative duration-stack-sliding-time ease-stack-slider-fnc `,
            mainStackClass
          )}
        >
          {mainStack.current.map((elem) => elem)}
        </div>

        {activeSlides.map((slideName) => (
          <ChildSlider
            key={slideName}
            slideName={slideName}
            childStackClass={childStackClass}
            trigerSlider={trigerSlider}
          >
            {slides.current[slideName]}
          </ChildSlider>
        ))}
      </div>
    </StackSliderContext.Provider>
  );
};

export { StackSlider };
