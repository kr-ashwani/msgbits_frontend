"use client";
import { useEffect, useRef } from "react";
import { googleOAuth } from "@/utils/OAuth/OAuthGoogle";
import { facebookOAuth } from "@/utils/OAuth/OAuthFacebook";
import GithubOAuthProviderButton from "./GithubOAuthProviderButton";
import { useAppDispatch } from "@/lib/store/hooks";
import Svg from "../svg";

const OAuth = () => {
  const dispatch = useAppDispatch();
  const facebookRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    googleOAuth(dispatch);
    const facebookUnsub = facebookOAuth(facebookRef, dispatch);
    return facebookUnsub;
  }, [dispatch]);

  return (
    <div className="flex items-center gap-10 sm:gap-12">
      <div className="relative">
        {Svg("AuthGoogle", { width: "47", height: "47" })}
        <div
          className="absolute left-0 right-0 top-0 mt-1 overflow-hidden rounded-full opacity-5"
          id="buttonDiv"
        ></div>
      </div>
      <div ref={facebookRef} className="relative">
        {Svg("AuthFacebook", { width: "53", height: "53" })}
      </div>
      <GithubOAuthProviderButton>
        {Svg("AuthGithub", { width: "50", height: "50" })}
      </GithubOAuthProviderButton>
    </div>
  );
};

export default OAuth;
