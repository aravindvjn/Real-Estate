import CreateUser from "@/components/auth-page/create-user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
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
