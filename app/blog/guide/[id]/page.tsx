import DetailedGuide from "@/components/blog-page/guide-page/detailed-guide/detailed-page";
import {
  DetailedGuidesType,
  realEstateGuides,
} from "@/components/blog-page/guide-page/guides";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const results = realEstateGuides
  .flatMap((guide) => guide.guides)
  .find((item) => item.id === Number(id)); 
  
  if (!results) {
    notFound();
  }

  return (
    <div>
      <DetailedGuide {...results} />
    </div>
  );
};

export default page;
