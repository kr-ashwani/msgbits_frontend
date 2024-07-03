"use client";
import Link from "next/link";
import AuthFacebook from "/public/icons/AuthFacebook.svg";
import AuthGithub from "/public/icons/AuthGithub.svg";
import AuthGoogle from "/public/icons/AuthGoogle.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { googleOAuth } from "@/utils/OAuth/OAuthGoogle";
import { facebookOAuth } from "@/utils/OAuth/OAuthFacebook";
import GithubOAuthProviderButton from "./GithubOAuthProviderButton";
import { useAppDispatch } from "@/lib/store/hooks";

const OAuth = () => {
  const dispatch = useAppDispatch();
  const facebookRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    googleOAuth(dispatch);
    const facebookUnsub = facebookOAuth(facebookRef, dispatch);
    return facebookUnsub;
  }, [dispatch]);

  //useOAuthFacebook(facebookRef);

  return (
    <div className="flex items-center gap-10 sm:gap-12">
      <div className="relative">
        <Image width={47} src={AuthGoogle} alt="google icon"></Image>
        <div
          className="absolute left-0 right-0 top-0 mt-1 overflow-hidden rounded-full opacity-5"
          id="buttonDiv"
        ></div>
      </div>
      <div ref={facebookRef} className="relative">
        <Image width={53} src={AuthFacebook} alt="google icon"></Image>
      </div>
      <GithubOAuthProviderButton>
        <Image width={50} src={AuthGithub} alt="google icon"></Image>
      </GithubOAuthProviderButton>
    </div>
  );
};

export default OAuth;
