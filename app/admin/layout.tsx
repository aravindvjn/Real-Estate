"use server";
import { isAdmin } from "@/lib/functions/getCurrentUser";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const isadmin = await isAdmin();
  if (!isadmin) {
    notFound();
  }
  return <div>{children}</div>;
};

export default layout;
