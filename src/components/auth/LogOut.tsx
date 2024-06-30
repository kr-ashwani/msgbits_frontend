"use client";
import { fetchData } from "@/utils/custom/customFetch";
import Button from "../Button";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { z } from "zod";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { useAppDispatch } from "@/lib/store/hooks";
import { resetUser } from "@/lib/store/features/auth/authSlice";

const LogOut = () => {
  const dispatch = useAppDispatch();
  async function logout() {
    const response = await fetchData(
      "/logout",
      serverResWapperSchema(z.string()),
    );

    if (response.success) {
      toastDelegate.success(response.payload.data);
      dispatch(resetUser());
    } else toastDelegate.error(response.error);
  }
  return <Button onClick={logout}>Log Out</Button>;
};

export default LogOut;
