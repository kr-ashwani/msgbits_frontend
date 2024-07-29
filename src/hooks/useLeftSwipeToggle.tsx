/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect } from "react";

const useLeftSwipeToggle = (comp: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!comp.current) return;
    let offsetX = comp.current.getBoundingClientRect().left;
    let width = comp.current.clientWidth;
    let translatePercent = 0;
    let prevTranslatePercent = 0;
    let startBuff = 0;
    let shouldMove: boolean = false;
    let prevDis = 0;
    let prevTime = 0;
    let vel = 0;
    function touchStart(e: TouchEvent) {
      if (comp.current) {
        offsetX = comp.current.getBoundingClientRect().left;
        width = comp.current.clientWidth;
      }
      startBuff = e.changedTouches[0].clientX - offsetX;
      prevDis = startBuff;
      vel = 0;

      shouldMove = startBuff < 100 ? true : false;
      translatePercent = 0;
      prevTranslatePercent = translatePercent;
    }
    function touchMove(e: TouchEvent) {
      if (!shouldMove) return;
      vel =
        (e.touches[0].clientX - offsetX - prevDis) / (Date.now() - prevTime);
      prevTime = Date.now();
      prevDis = e.touches[0].clientX;
      translatePercent = Math.ceil(
        ((e.touches[0].clientX - offsetX - startBuff) / width) * 100,
      );
      if (translatePercent < 0 || translatePercent > 100) return;

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
        comp.current.style.setProperty("transition-duration", "0ms");
      }
    }
    function touchEnd(e: TouchEvent) {
      if (!shouldMove) return;
      translatePercent = Math.ceil(
        ((e.changedTouches[0].clientX - offsetX - startBuff) / width) * 100,
      );
      translatePercent = translatePercent >= 50 ? 100 : 0;
      if (comp.current?.style) {
        comp.current.style.removeProperty("transform");
        comp.current.style.removeProperty("transition-duration");
        comp.current.style.removeProperty("transition-timing-function");
      }
      if (translatePercent === 100 || vel >= 0.5) showComponent();
      else hideComponent();
    }
    function showComponent() {}
    function hideComponent() {}
    function resize(this: Window) {
      if (comp.current) offsetX = comp.current.getBoundingClientRect().left;
      width = this.screen.width;
      if (comp.current) unregisterTouchEvents(comp.current);
      if (comp.current) registerTouchEvents(comp.current);
    }
    function registerTouchEvents(elem: HTMLElement) {
      const windowSize = document.getElementsByTagName("body")[0].offsetWidth;
      if (windowSize >= 1024) return;
      if (
        (windowSize >= 768 && elem.id === "chatRoomDetails") ||
        windowSize < 768
      ) {
        elem.addEventListener("touchstart", touchStart);
        elem.addEventListener("touchmove", touchMove);
        elem.addEventListener("touchend", touchEnd);
      }
    }
    function unregisterTouchEvents(elem: HTMLElement) {
      elem.removeEventListener("touchstart", touchStart);
      elem.removeEventListener("touchmove", touchMove);
      elem.removeEventListener("touchend", touchEnd);
    }
    registerTouchEvents(comp.current);
    window.addEventListener("resize", resize);
    return () => {
      if (comp.current) unregisterTouchEvents(comp.current);
      window.removeEventListener("resize", resize);
    };
  }, [comp]);

  return null;
};

export default useLeftSwipeToggle;
