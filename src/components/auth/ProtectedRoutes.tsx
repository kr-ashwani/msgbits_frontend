"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { user, isAuthPreflightCompleted } = useAppSelector(
    (state) => state.auth,
  );

  //console.log(pathname, user, isAuthPreflightCompleted);

  //to do added loading plus check extra rendering
  if (isAuthPreflightCompleted === false)
    return <p>Authenticating..... please wait</p>;
  else if (isAuthPreflightCompleted === true && user === null)
    return redirect(`/login?httpredirect=${pathname}`);
  else return children;
};

export default ProtectedRoute;
