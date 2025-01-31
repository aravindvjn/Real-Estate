"use server";
import HeaderNav from "@/components/header/header-nav";
import FilterProperties from "@/components/properties-page/filter-properties";
import React from "react";

export type PropterySearchParamsProps = {
  searchParams: {
    type: "rent" | "sale";
    category: "luxury" | "new";
    location: string;
    search: string;
    bedroom: number;
    bathroom: number;
    garage: number;
    minPrice: number;
    maxPrice: number;
    size: number;
  };
};

const Page = async ({ searchParams }: PropterySearchParamsProps) => {
  const data = await searchParams;
  return (
    <div>
      <HeaderNav />
      <FilterProperties searchParams={data} />
    </div>
  );
};

export default Page;
