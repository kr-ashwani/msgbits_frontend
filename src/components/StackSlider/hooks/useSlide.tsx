import { useContext } from "react";
import { StackSliderContext } from "../StatckSlider";

const useSlide = () => {
  return useContext(StackSliderContext);
};

export default useSlide;
