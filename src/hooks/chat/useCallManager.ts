import { CallManagerContext } from "@/context/CallManagerContext";
import { useContext } from "react";

export function useCallManager() {
  const context = useContext(CallManagerContext);

  if (context === null) {
    throw new Error("useCallManager must be used within a CallManagerProvider");
  }

  return context;
}
