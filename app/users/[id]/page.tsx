import { PropertySearchParams } from "@/app/properties/page";
import HeaderNav from "@/components/header/header-nav";
import PublishedProperties from "@/components/user-page/published-properties";
import UserProfiles from "@/components/user-page/user-profile";
import { getUser } from "@/lib/functions/getUser";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type ParamsProps = {
  params: { id: string };
};
const page = async ({ params }: ParamsProps) => {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const user = await getUser(id);
  if (!user) {
    notFound();
  }

  return (
    <div>
      <HeaderNav />
      <UserProfiles {...user} />
      <PublishedProperties searchParams={{ owner_id: user?.user_id || "" }} />
    </div>
  );
};

export default page;
