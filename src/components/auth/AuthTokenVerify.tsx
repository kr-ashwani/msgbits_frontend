"use client";
import { useAppDispatch } from "@/lib/store/hooks";
import { authVerify } from "@/utils/OAuth/authVerify";
import { useEffect } from "react";

const AuthTokenVerify = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authVerify(dispatch);
  }, [dispatch]);
  return null;
};

export default AuthTokenVerify;
