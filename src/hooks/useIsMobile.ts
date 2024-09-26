import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const MOBILE_BREAKPOINT = 768;

const isMobilePlatform = (): boolean => {
  if (typeof window === "undefined") return false; // Server-side rendering check

  const userAgent = window.navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isNarrowScreen = window.innerWidth < MOBILE_BREAKPOINT;

  return isMobileUA || isTouchDevice;
};

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(isMobilePlatform());

  const checkMobile = useCallback(() => {
    setIsMobile(isMobilePlatform());
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(checkMobile, 300);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      debouncedHandleResize.cancel(); // Cancel any pending debounced calls
    };
  }, [checkMobile]);

  return isMobile;
};

export default useIsMobile;
