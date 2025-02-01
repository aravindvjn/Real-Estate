import EditingForm from "@/components/detailed-page/edit-page/editing-form";
import React from "react";

const page = async({ params }: { params: { id: string } }) => {
  const { id } =await params;
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
