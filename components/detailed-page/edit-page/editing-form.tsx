import AddPropertyForm from "@/components/add-property-page/add-property-form";
import { getPropertyById } from "@/lib/functions/getPropertyById";
import { notFound } from "next/navigation";
import React from "react";

const EditingForm = async ({ id }: { id: string }) => {
  const properties = await getPropertyById(id);
  if (!properties) {
    notFound();
  }
  return (
    <div>
      <AddPropertyForm {...properties!} />
    </div>
  );
};

export default EditingForm;
