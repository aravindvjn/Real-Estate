import AddPropertyForm from "@/components/add-property-page/add-property-form";
import { getCurrentUser } from "@/lib/functions/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {

  //User is need to add a property, if not redirect to auth page
  const user = await getCurrentUser(true);

  if (!user) {
    redirect("/auth");
  }
  
  return (
    <div>
      <AddPropertyForm />
    </div>
  );
};

export default Page;
