import EditingForm from "@/components/detailed-page/edit-page/editing-form";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

  //get id from params to get the intial data from server.
  const { id } = await params;

  //if no id, return nothing.
  if (!id) {
    return null;
  }
  
  return (
    <div>
      <EditingForm id={id} />
    </div>
  );
};

export default page;
