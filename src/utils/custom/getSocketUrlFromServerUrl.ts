import { removeSubstring } from "./removeSubstring";

export const getSocketUrlFromServerUrl = (serverUrl: string) => {
  let socketUrl: string;

  socketUrl = removeSubstring(serverUrl, "/api");
  socketUrl = removeSubstring(serverUrl, "/api/");

  return socketUrl;
};
