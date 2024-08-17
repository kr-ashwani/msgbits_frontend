import { ReactNode } from "react";
import { getGithubOAuthUrl } from "@/utils/OAuth/getGithubOAuthURL";
import { useAppDispatch } from "@/lib/store/hooks";
import { authVerify } from "@/utils/OAuth/authVerify";
import { toast } from "@/utils/toast/Toast";

const GithubOAuthProviderButton = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  let windowObjectReference: any = null;
  let previousUrl: any = null;

  const openSignInWindow = () => {
    const url = getGithubOAuthUrl();
    const name = "Github OAuth Window";
    // window features
    const strWindowFeatures =
      "toolbar=no, menubar=no, width=600, height=600, top=100, left=0";
    if (windowObjectReference === null || windowObjectReference.closed) {
      /* if the pointer to the window object in memory does not exist
      or if such pointer exists but the window was closed */
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      /* if the resource to load is different,
      then we load it in the already opened secondary window and then
      we bring such window back on top/in front of its parent window. */
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      /* else the window reference must exist and the window
      is not closed; therefore, we can bring it back on top of any other
      window with the focus() method. There would be no need to re-create
      the window or to reload the referenced resource. */
      windowObjectReference.focus();
    }
    // add the listener for receiving a message from the popup
    window.addEventListener("message", receiveMessage);
    // assign the previous URL
    previousUrl = url;
  };

  function receiveMessage(event: any) {
    if (event.origin !== process.env.NEXT_PUBLIC_SELF_URL) return;
    //this confirms that message is provided by window opener
    if (event.data?.source === "msgbitsApp") {
      window.removeEventListener("message", receiveMessage);
      const serverMsg: any = event.data;
      if (serverMsg.success) authVerify(dispatch);
      else toast.error("Authentication Error: " + serverMsg.error);
    }
  }

  return (
    <div className="cursor-pointer" onClick={() => openSignInWindow()}>
      {children}
    </div>
  );
};

export default GithubOAuthProviderButton;
