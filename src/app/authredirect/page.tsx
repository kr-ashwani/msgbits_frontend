"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const AuthRedirect = () => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <AuthRedirectComponent />
    </Suspense>
  );
};

const AuthRedirectComponent = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    // get the URL parameters which will include the auth token
    if (window.opener) {
      // send them to the opening window
      const serverMsg = {
        source: "msgbitsApp",
        success: searchParams.get("success"),
        message: searchParams.get("message"),
        error: searchParams.get("error"),
      };
      window.opener.postMessage(serverMsg);
      // close the popup
      window.close();
    }
  }, [searchParams]);
  // some text to show the user
  return <p>Please wait...</p>;
};

export default AuthRedirect;
