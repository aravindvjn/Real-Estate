import DetailedPage from "@/components/detailed-page/DetailedPage";
import { getPropertyById } from "@/lib/functions/getPropertyById";
import { notFound } from "next/navigation";
import React from "react";
type ParamsType = {
  params: { id: string };
};
async function Page({ params }: ParamsType) {
  const { id } = await params;

  if (!id) {
    notFound();
  }
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div>
      <DetailedPage property={property} />
    </div>
  );
}

export default Page;
