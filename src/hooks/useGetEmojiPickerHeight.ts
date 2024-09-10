import { useState, useEffect } from "react";
import useDetectKeyboardOpen from "./useDetectKeyboardOpen";

export const useGetEmojiPickerHeight = () => {
  const [pickerHeight, setPickerHeight] = useState(440); // Default height
  const isKeyboardopen = useDetectKeyboardOpen();

  useEffect(() => {
    setPickerHeight(isKeyboardopen ? 350 : 440);
  }, [isKeyboardopen]);

  return pickerHeight;
};
