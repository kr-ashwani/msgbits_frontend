import {
  setUser,
  setAuthPreflightCompleted,
} from "@/lib/store/features/auth/authSlice";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { UserSchema } from "@/schema/userSchema";
import { fetchData } from "../custom/customFetch";
import { toastDelegate } from "../toastDelegate/ToastDelegate";

import { storeDispatch } from "./types";

export const authVerify = async (dispatch: storeDispatch) => {
  try {
    const response = await fetchData(
      "/authtokenverify",
      serverResWapperSchema(UserSchema),
    );

    if (response.success) {
      dispatch(setUser(response.payload.data));
      if (process.env.NODE_ENV === "development")
        toastDelegate.success(
          `${response.payload.data.name}, You are Authenticated successfully.`,
        );
    } else {
      //if (process.env.NODE_ENV === "development")
      // toastDelegate.error(response.error);
    }
  } catch (err) {
    dispatch(setAuthPreflightCompleted(true));
    // if (process.env.NODE_ENV === "development" && err instanceof Error)
    //   toastDelegate.error(err.message);
  }
};
