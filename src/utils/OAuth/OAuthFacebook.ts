import { RefObject } from "react";
import { toast } from "../toast/Toast";
import { fetchData } from "../custom/customFetch";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { authVerify } from "./authVerify";
import { UserSchema } from "@/schema/userSchema";
import { AppDispatch } from "@/lib/store/store";

const facebookOAuth = (
  facebookRef: RefObject<HTMLDivElement>,
  dispatch: AppDispatch,
) => {
  function statusChangeCallback(response: any) {
    // Called with the results from FB.getLoginStatus().
    if (response.status === "connected") {
      // Logged into your webpage and Facebook.
      getFacebookUserInfo(response);
    }
  }

  function checkLoginState() {
    // Called when a person is finished with the Login Button.
    const FB = (globalThis as any).FB;
    (window as any).fbAsyncInit();
    FB.login(function (response: any) {
      statusChangeCallback(response);
    });
  }

  (window as any).fbAsyncInit = function () {
    const FB = (globalThis as any).FB;
    try {
      FB.init({
        appId: process.env.NEXT_PUBLIC_OAUTH_FACEBOOK_APP_ID,
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: "v20.0", // Use this Graph API version for this call.
      });
    } catch (err) {
      console.log("err init");
    }
  };

  async function getFacebookUserInfo(response: any) {
    // body...
    try {
      const servRes = await fetchData(
        "/oauth/facebook",
        serverResWapperSchema(UserSchema),
        {
          accessToken: response.authResponse.accessToken,
        },
      );
      if (servRes.success) authVerify(dispatch);
      else throw new Error(servRes.error);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  facebookRef.current?.addEventListener("click", checkLoginState);

  return (): void =>
    facebookRef.current?.removeEventListener("click", checkLoginState);
};

export { facebookOAuth };
