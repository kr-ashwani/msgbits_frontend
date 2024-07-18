import { useEffect, useState } from "react";

const useDetectKeyboardOpen = (minKeyboardHeight = 300) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (!window.visualViewport) return;
      const newState =
        window.screen.height - minKeyboardHeight > window.visualViewport.height;
      setIsKeyboardOpen(newState);
    };
    if (window.visualViewport !== null) {
      window.visualViewport.addEventListener("resize", listener);
    }
    return () => {
      if (window.visualViewport !== null) {
        window.visualViewport.removeEventListener("resize", listener);
      }
    };
  }, [minKeyboardHeight]);

  return isKeyboardOpen;
};

export default useDetectKeyboardOpen;
