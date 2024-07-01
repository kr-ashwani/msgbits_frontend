"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthPreflightCompleted } = useAppSelector(
    (state) => state.auth,
  );

  if (isAuthPreflightCompleted === true && user) return redirect("/chat");
  else return children;
};

export default AuthRoute;
