import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
  slides: React.MutableRefObject<{
    [x: string]: React.ReactNode;
  }>;
  mainStack: React.MutableRefObject<React.ReactNode[]>;
}
const getChildren = ({ children, slides, mainStack }: props) => {
  let j = 0;
  const elemArr = React.Children.toArray(children);
  for (let i = 0; i < elemArr.length; i++) {
    const elems = elemArr[i] as React.ReactElement;
    if (elems.props && elems.props.name) slides.current[elems.props.name] = elems;
    else mainStack.current[j++] = elems;
  }
};

export default getChildren;
