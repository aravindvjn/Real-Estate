"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import HeaderNav from "../header/header-nav";
import { usePathname } from "next/navigation";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const isHeader = ["/","/auth"].includes(pathName);
  return (
    <SessionProvider>
      {!isHeader && <HeaderNav />}
      {children}
    </SessionProvider>
  );
};
