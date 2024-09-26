import {
  setUser,
  setAuthPreflightCompleted,
} from "@/lib/store/features/auth/authSlice";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { UserSchema } from "@/schema/userSchema";
import { fetchData } from "../custom/customFetch";
import { toast } from "../toast/Toast";
import { AppDispatch } from "@/lib/store/store";
import { debug } from "../custom/Debug";
import { resetChatData } from "@/lib/store/features/chat/chatSlice";

export const authVerify = async (dispatch: AppDispatch) => {
  try {
    const response = await fetchData(
      "/authtokenverify",
      serverResWapperSchema(UserSchema),
    );

    if (response.success) {
      dispatch(setUser(response.payload.data));
      if (process.env.NODE_ENV === "development")
        toast.success(
          `${response.payload.data.name}, You are Authenticated successfully.`,
        );
    } else throw new Error(response.error);
  } catch (err) {
    // resetting chat data for user
    dispatch(resetChatData());
    dispatch(setAuthPreflightCompleted(true));
    debug(
      "error",
      err instanceof Error ? err.message : "Auth Token Verification failed",
    );
  }
};
