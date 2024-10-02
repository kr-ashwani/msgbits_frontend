import React, { useState } from "react";
import ChatInputArea from "./ChatInputArea";
import FilesPreviewDrawer from "./FilesPreviewDrawer";

export interface FileUpload {
  file: File;
  type: "attachment" | "document";
  fileId: string;
  message: string;
  senderId: string;
  chatRoomId: string;
  repliedTo: string | null;
}

interface FilesContextProps {
  files: FileUpload[];
  setFiles: React.Dispatch<React.SetStateAction<FileUpload[]>>;
}

export function useFiles() {
  const context = React.useContext(FilesContext);

  if (!context) {
    throw new Error("useFiles must be used within a <ChatFooterArea />");
  }

  return context;
}

const FilesContext = React.createContext<FilesContextProps | null>(null);

const ChatFooterArea = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  const value = {
    files,
    setFiles,
  };
  return (
    <FilesContext.Provider value={value}>
      <ChatInputArea />
      <FilesPreviewDrawer />
    </FilesContext.Provider>
  );
};

export default ChatFooterArea;
