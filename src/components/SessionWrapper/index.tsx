"use client";
import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log("clientside");
  }, []);

  const { data: session } = useSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
