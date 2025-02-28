import CreateUser from "@/components/auth-page/create-user";
import { authOptions } from "@/lib/authOptions";
import type { SessionUserType } from "@/lib/functions/getCurrentUser";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {

  //get session
  const session: SessionUserType | null = await getServerSession(authOptions);

  //if no session, redirect
  if (!session) {
    redirect("/auth");
  }

  //if user not new, redirect to home.
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
