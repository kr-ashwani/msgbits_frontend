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
    } else {
      dispatch(setAuthPreflightCompleted(true));
      debug("error", response.error);
    }
  } catch (err) {
    dispatch(setAuthPreflightCompleted(true));
    debug(
      "error",
      err instanceof Error ? err.message : "Auth Token Verification failed",
    );
  }
};
