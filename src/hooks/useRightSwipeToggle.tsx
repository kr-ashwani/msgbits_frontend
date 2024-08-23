/* eslint-disable react-hooks/exhaustive-deps */
import { getCurrentTranslateX } from "@/utils/custom/getTranslateX";
import { RefObject, useEffect } from "react";

const useRightSwipeToggle = (
  comp: RefObject<HTMLElement>,
  setter: (a: boolean) => void,
) => {
  const component = comp.current;

  useEffect(() => {
    if (!component) return;
    let offsetX = component.getBoundingClientRect().left;
    let width = component.clientWidth;
    let translatePercent = 0;
    let prevTranslatePercent = 0;
    let startBuff = 0;
    let shouldMove: boolean = false;
    let prevDis = 0;
    let prevTime = 0;
    let vel = 0;
    let childTranslatePercent = 0;
    let parentTranslatePercent = 0;
    function touchStart(e: TouchEvent) {
      e.stopPropagation();
      if (component) {
        offsetX = component.getBoundingClientRect().left;
        width = component.clientWidth;
        childTranslatePercent = Math.ceil(
          (getCurrentTranslateX(component) / width) * 100,
        );
      }

      startBuff = e.changedTouches[0].clientX - offsetX;
      prevDis = startBuff;
      vel = 0;

      shouldMove = startBuff < 100 ? true : false;
      translatePercent = 0;
      prevTranslatePercent = translatePercent;
    }
    function touchMove(e: TouchEvent) {
      e.stopPropagation();
      if (!shouldMove) return;
      vel =
        (e.touches[0].clientX - offsetX - prevDis) / (Date.now() - prevTime);
      prevTime = Date.now();
      prevDis = e.touches[0].clientX;
      translatePercent = Math.ceil(
        ((e.touches[0].clientX - offsetX - startBuff) / width) * 100,
      );
      // if (translatePercent < 0 || translatePercent > 100) return;

      if (Math.abs(translatePercent - prevTranslatePercent) < 1) return;
      prevTranslatePercent = translatePercent;

      const childTranslateX = translatePercent + childTranslatePercent;
      if (childTranslateX <= 100 && childTranslateX >= 0) {
        component?.style.setProperty(
          "transform",
          `translateX(${childTranslateX}%)`,
        );
        component?.style.setProperty(
          "transition-timing-function",
          "ease-in-out",
        );
        component?.style.setProperty("transition-duration", "0ms");
      }
    }
    function touchEnd(e: TouchEvent) {
      e.stopPropagation();
      if (!shouldMove) return;
      translatePercent = Math.ceil(
        ((e.changedTouches[0].clientX - offsetX - startBuff) / width) * 100,
      );
      translatePercent = translatePercent >= 50 ? 100 : 0;

      component?.style.removeProperty("transform");
      component?.style.removeProperty("transition-duration");
      component?.style.removeProperty("transition-timing-function");

      if (translatePercent === 100 || vel >= 0.5) setter(true);
      else setter(false);
    }
    function resize(this: Window) {
      if (component) offsetX = component.getBoundingClientRect().left;
      width = this.screen.width;
      if (component) unregisterTouchEvents(component);
      if (component) registerTouchEvents(component);
    }
    function registerTouchEvents(elem: HTMLElement) {
      elem.addEventListener("touchstart", touchStart);
      elem.addEventListener("touchmove", touchMove);
      elem.addEventListener("touchend", touchEnd);
    }
    function unregisterTouchEvents(elem: HTMLElement) {
      elem.removeEventListener("touchstart", touchStart);
      elem.removeEventListener("touchmove", touchMove);
      elem.removeEventListener("touchend", touchEnd);
    }
    registerTouchEvents(component);
    window.addEventListener("resize", resize);

    if (component) {
      component.addEventListener("scrollend", () => {
        unregisterTouchEvents(component);
        registerTouchEvents(component);
      });
      component.addEventListener("scroll", () =>
        unregisterTouchEvents(component),
      );
    }
    return () => {
      if (component) unregisterTouchEvents(component);
      window.removeEventListener("resize", resize);
    };
  }, [comp, parent, setter]);
};

export { useRightSwipeToggle };
