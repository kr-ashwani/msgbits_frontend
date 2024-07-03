import { AuthState } from "@/lib/store/features/auth/authSlice";
import { QueryState } from "@/lib/store/features/query/querySlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export type storeDispatch = ThunkDispatch<
  {
    auth: AuthState;
    query: QueryState;
  },
  undefined,
  UnknownAction
> &
  Dispatch<UnknownAction>;
