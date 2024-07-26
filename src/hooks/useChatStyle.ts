import { useEffect } from "react";

/**
 * set up style for body and remove that style on unmountting
 */
const useChatStyle = () => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].classList.add("chatStyle");
    return () => {
      document.getElementsByTagName("body")[0].classList.remove("chatStyle");
    };
  }, []);
};

export default useChatStyle;
