"use client";
import { fetchData } from "@/utils/custom/customFetch";
import Button from "../utility/Button";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { z } from "zod";
import { toast } from "@/utils/toast/Toast";
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
      toast.success(response.payload.data);
      dispatch(resetUser());
    } else toast.error(response.error);
  }
  return <Button onClick={logout}>Log Out</Button>;
};

export default LogOut;
