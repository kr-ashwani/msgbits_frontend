import { RefObject } from "react";
import { fetchData } from "../custom/customFetch";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { authVerify } from "./authVerify";
import { UserSchema } from "@/schema/userSchema";
import { AppDispatch } from "@/lib/store/store";
import { debug } from "../custom/debug";

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

  async function checkLoginState() {
    // Called when a person is finished with the Login Button.
    try {
      const FB = (globalThis as any).FB;
      (window as any).fbAsyncInit();

      FB.login((response: any) => {
        statusChangeCallback(response);
      });
    } catch (err: unknown) {
      if (err instanceof Error)
        debug("error", `Unable to login facebook due to ${err.message}`);
    }
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
    } catch (err: unknown) {
      if (err instanceof Error)
        debug("error", `Unable to initialize facebook due to ${err.message}`);
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
      if (err instanceof Error) debug("error", err.message);
    }
  }

  facebookRef.current?.addEventListener("click", checkLoginState);

  return (): void =>
    facebookRef.current?.removeEventListener("click", checkLoginState);
};

export { facebookOAuth };
