"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (user === null) return redirect("/");
  else return children;
};

export default ProtectedRoute;
