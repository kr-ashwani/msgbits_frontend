import React, { ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import getChildren from "./getChildren";
import { sleep } from "./utils/sleep";
import useLeftSwipeToggle from "./hooks/useLeftSwipeToggle";

const initialState = {
  active: false,
  ActiveComponentName: "",
  sliderClosing: false,
};
const SLIDING_TIME = 300;
const SLIDER_FNC = "cubic-bezier(0.12, 0.8, 0.32, 1)";

const StackSliderContext = React.createContext({
  slideInfo: initialState,
  trigerSlider: (name: string): void => {},
});

function useSlider() {
  return useContext(StackSliderContext);
}

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
  const [slideInfo, setSlideInfo] = useState(initialState);
  const storeTimer = useRef<NodeJS.Timeout>();
  const mainStack = useRef<ReactNode[]>([]);
  const parentSlide = useRef<HTMLDivElement>(null);
  const childSlide = useRef<HTMLDivElement>(null);
  const slides = useRef<{ [p in string]: ReactNode }>({});
  const [showSlides, setShowSlides] = useState(false);

  useLeftSwipeToggle(childSlide, parentSlide, (state) => {
    if (state) {
      setShowSlides(false);
      trigerSlider(null);
    }
  });

  useMemo(() => getChildren({ children, slides, mainStack }), [children]);

  function trigerSlider(ActiveComponentName: string | null) {
    if (!ActiveComponentName) {
      setSlideInfo((prev) => ({
        ...prev,
        sliderClosing: true,
      }));
      setShowSlides(false);

      storeTimer.current = setTimeout(() => {
        setSlideInfo(initialState);
      }, SLIDING_TIME);
    } else {
      clearTimeout(storeTimer.current);
      const compName = ActiveComponentName;
      setSlideInfo((prev) => ({
        ...prev,
        active: true,
        ActiveComponentName: compName,
        sliderClosing: false,
      }));
    }
  }

  //adding short delay for triggering animation
  useEffect(() => {
    async function delay() {
      await sleep(100);
      if (slideInfo.active && !slideInfo.sliderClosing) setShowSlides(true);
    }
    delay();
  }, [slideInfo]);

  const values = {
    slideInfo,
    trigerSlider,
  };

  useEffect(() => {
    // add sliding time and fuction to root
    document.documentElement.style.setProperty("--stack-sliding-time", `${SLIDING_TIME}ms`);
    document.documentElement.style.setProperty("--stack-slider-fnc", SLIDER_FNC);
  }, []);

  return (
    <StackSliderContext.Provider value={values}>
      <div className={` ${stackContainerClass} relative overflow-hidden`}>
        <div
          ref={parentSlide}
          className={` ${mainStackClass} transition relative duration-stack-sliding-time ease-stack-slider-fnc ${
            showSlides ? "translate-x-[-60%]" : "translate-x-0"
          }`}
        >
          {mainStack.current.map((elem) => elem)}
        </div>
        {slideInfo.active && slides.current[slideInfo.ActiveComponentName] ? (
          <div
            ref={childSlide}
            className={`${childStackClass}  absolute inset-0 transition duration-stack-sliding-time ease-stack-slider-fnc ${
              showSlides ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {slides.current[slideInfo.ActiveComponentName]}
          </div>
        ) : null}
      </div>
    </StackSliderContext.Provider>
  );
};

const strCompare = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase();
};

export { StackSlider, useSlider };
