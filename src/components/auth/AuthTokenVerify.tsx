"use client";
import {
  setAuthPreflightCompleted,
  setUser,
} from "@/lib/store/features/auth/authSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { UserSchema } from "@/schema/userSchema";
import { fetchData } from "@/utils/custom/customFetch";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";

import { useEffect } from "react";

const AuthTokenVerify = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function authVerify() {
      try {
        const response = await fetchData("/authtokenverify", UserSchema);

        if (response.success) {
          dispatch(setUser(response.payload));
        } else {
          dispatch(setAuthPreflightCompleted(true));
          toastDelegate.error(response.error);
        }
      } catch (err) {
        dispatch(setAuthPreflightCompleted(true));
        if (process.env.NODE_ENV === "development" && err instanceof Error)
          toastDelegate.error(err.message);
      }
    }
    authVerify();
  }, [dispatch]);
  return null;
};

export default AuthTokenVerify;
