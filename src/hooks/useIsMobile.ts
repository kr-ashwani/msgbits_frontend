import { useState, useEffect } from "react";

const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent;
  const mobileKeywords = [
    "Android",
    "webOS",
    "iPhone",
    "iPad",
    "iPod",
    "BlackBerry",
    "Windows Phone",
  ];
  const isMobileDevice = mobileKeywords.some((keyword) =>
    userAgent.includes(keyword),
  );
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return isMobileDevice || isTouchDevice;
};

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
