/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

const useLeftSwipeToClose = (
  comp: RefObject<HTMLElement>,
  displayComponentSetter: Dispatch<SetStateAction<boolean>> | null,
) => {
  useEffect(() => {
    if (!comp.current) return;
    let width = comp.current.clientWidth;
    let translatePercent = 0;
    let prevTranslatePercent = 0;
    let startBuff = 0;
    let shouldMove: boolean = false;
    let prevDis = 0;
    let prevTime = 0;
    let vel = 0;
    function touchStart(e: TouchEvent) {
      startBuff = e.changedTouches[0].clientX;
      prevDis = startBuff;
      vel = 0;

      shouldMove = startBuff < 100 ? true : false;
      translatePercent = 0;
      prevTranslatePercent = translatePercent;
    }
    function touchMove(e: TouchEvent) {
      if (!shouldMove) return;
      vel = (e.touches[0].clientX - prevDis) / (Date.now() - prevTime);
      //  console.log(vel);
      prevTime = Date.now();
      prevDis = e.touches[0].clientX;
      translatePercent = Math.ceil(
        ((e.touches[0].clientX - startBuff) / width) * 100,
      );
      if (translatePercent < 0 || translatePercent > 200) return;

      if (Math.abs(translatePercent - prevTranslatePercent) < 1) return;
      prevTranslatePercent = translatePercent;
      if (comp.current?.style) {
        comp.current.style.setProperty(
          "transform",
          `translateX(${translatePercent}%)`,
        );
        comp.current.style.setProperty(
          "transition-timing-function",
          "ease-in-out",
        );
        comp.current.style.setProperty("transition-duration", "150ms");
      }
      // console.log(translatePercent);
    }
    function touchEnd(e: TouchEvent) {
      if (!shouldMove) return;
      translatePercent = Math.ceil(
        ((e.changedTouches[0].clientX - startBuff) / width) * 100,
      );
      translatePercent = translatePercent >= 50 ? 100 : 0;
      console.log(vel);
      if (comp.current?.style) {
        comp.current.style.removeProperty("transform");
        comp.current.style.removeProperty("transition-duration");
        comp.current.style.removeProperty("transition-timing-function");
      }
      if (translatePercent === 100)
        displayComponentSetter && displayComponentSetter(false);
      else if (vel >= 0.5)
        displayComponentSetter && displayComponentSetter(false);
      else displayComponentSetter && displayComponentSetter(true);
      //console.log(translatePercent);
    }
    function resize(this: Window) {
      width = this.screen.width;
    }
    comp.current.addEventListener("touchstart", touchStart);
    comp.current.addEventListener("touchmove", touchMove);
    comp.current.addEventListener("touchend", touchEnd);
    window.addEventListener("resize", resize);
    return () => {
      comp.current?.removeEventListener("touchstart", touchStart);
      comp.current?.removeEventListener("touchmove", touchMove);
      comp.current?.removeEventListener("touchend", touchEnd);
      window.removeEventListener("resize", resize);
    };
  }, [comp, displayComponentSetter]);

  return null;
};

export default useLeftSwipeToClose;