import AddPropertyForm from "@/components/add-property-page/add-property-form";
import HeaderNav from "@/components/header/header-nav";
import { getCurrentUser } from "@/lib/functions/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser(true);

  if (!user) {
    redirect("/auth");
  }
  
  return (
    <div>
      <HeaderNav />
      <AddPropertyForm />
    </div>
  );
};

export default Page;
