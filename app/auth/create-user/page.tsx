import CreateUser from "@/components/auth-page/create-user";
import { authOptions } from "@/lib/authOptions";
import type { SessionUserType } from "@/lib/functions/getCurrentUser";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session: SessionUserType | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }
  if (!session?.isNewUser) {
    redirect("/");
  }
  if (session?.isNewUser) {
    return (
      <div>
        <CreateUser session={session} />
      </div>
    );
  }
  return <div></div>;
};

export default Page;
