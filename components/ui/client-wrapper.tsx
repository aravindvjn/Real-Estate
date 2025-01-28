'use client'
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
    "use client";
    return <SessionProvider>{children}</SessionProvider>;
  };