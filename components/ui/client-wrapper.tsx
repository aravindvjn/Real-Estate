"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import HeaderNav from "../header/header-nav";
import { usePathname } from "next/navigation";
import Footer from "../footer/footer";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const isHeader = ["/", "/auth","/auth/create-user"].includes(pathName);
  const isFooter = ["/auth","/auth/create-user"].includes(pathName);
  return (
    <SessionProvider>
      {!isHeader && <HeaderNav />}
      <div className="min-h-screen">{children}</div>
      {!isFooter && <Footer />}
    </SessionProvider>
  );
};
