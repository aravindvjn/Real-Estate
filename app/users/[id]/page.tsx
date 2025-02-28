
import PublishedProperties from "@/components/user-page/published-properties";
import UserProfiles from "@/components/user-page/user-profile";
import { getUser } from "@/lib/functions/getUser";
import { notFound } from "next/navigation";
import React from "react";

type ParamsProps = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: ParamsProps) => {

  //extract id from the params
  const { id } = await params;
  if (!id) {
    notFound();
  }

  //find the user by id.
  const user = await getUser(id);
  if (!user) {
    notFound();
  }

  return (
    <div>
      <UserProfiles {...user} />
      <PublishedProperties searchParams={{ owner_id: user?.user_id }} />
    </div>
  );
};

export default page;
