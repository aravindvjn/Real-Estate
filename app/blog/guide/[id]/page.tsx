import DetailedGuide from "@/components/blog-page/guide-page/detailed-guide/detailed-page";
import { realEstateGuides } from "@/components/blog-page/guide-page/guides";
import { notFound } from "next/navigation";
import React from "react";
import { PageProps } from "next"; 

const Page = async ({ params }: PageProps<{ id: string }>) => {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const result = realEstateGuides
    .flatMap((guide) => guide.guides)
    .find((item) => item.id === id);

  if (!result) {
    notFound();
  }

  return (
    <div>
      <DetailedGuide {...result} />
    </div>
  );
};

export default Page;
