import AccountActivities from "@/components/account-page/account-activities";
import PublishedProperties from "@/components/user-page/published-properties";
import UserProfiles from "@/components/user-page/user-profile";
import { getCurrentUser } from "@/lib/functions/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {

  //get current user details to show case
  const user = await getCurrentUser();

  //if not user, redirect to login page
  if (!user) {
    redirect("/auth");
  }

  return (
    <div>
      <UserProfiles {...user} />
      <AccountActivities />
      <PublishedProperties searchParams={{ owner_id: user?.user_id || "" }} />
    </div>
  );
};

export default page;
