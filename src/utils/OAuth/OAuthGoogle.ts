import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { fetchData } from "../custom/customFetch";
import { toast } from "../toast/Toast";
import { authVerify } from "./authVerify";
import { UserSchema } from "@/schema/userSchema";
import { AppDispatch } from "@/lib/store/store";

async function handleCredentialResponse(response: any, dispatch: AppDispatch) {
  try {
    const servRes = await fetchData(
      "/oauth/google",
      serverResWapperSchema(UserSchema),
      {
        jwt: response.credential,
      },
    );
    if (servRes.success) authVerify(dispatch);
    else throw new Error(servRes.error);
  } catch (err) {
    if (err instanceof Error) toast.error(err.message);
  }
}

function googleOAuth(dispatch: AppDispatch) {
  const globalThisVar = globalThis as any;
  if (!globalThisVar?.google)
    return toast.error(
      "Authentication Error: Google OAuth initialization Failed",
    );
  try {
    //initialize google OAuth
    globalThisVar.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID,
      callback: (res: any) => handleCredentialResponse(res, dispatch),
    });
    //Render google OAuth button
    globalThisVar.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" },
    );
    //Display one Tap Dailog
    globalThisVar.google.accounts.id.prompt();
  } catch (err) {
    toast.error("Authentication Error: Google OAuth initialization Failed");
  }
}
export { googleOAuth };
