import React, { ReactNode } from "react";

function show() {
  const list: ReactNode[] = [];
  for (let i = 0; i <= 20; i++) {
    list.push(<div className="p-8">{i}</div>);
  }
  return list;
}
const ChatAreaView = () => {
  return <div className="grow overflow-y-auto">{show()}</div>;
};

export default ChatAreaView;
