"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";
import AuthenticatingMessage from "./AuthenticatingMessage";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { user, isAuthPreflightCompleted } = useAppSelector(
    (state) => state.auth,
  );

  if (isAuthPreflightCompleted === false) return <AuthenticatingMessage />;
  else if (isAuthPreflightCompleted === true && user === null)
    return redirect(`/login?httpredirect=${pathname}`);
  else return children;
};

export default ProtectedRoute;
