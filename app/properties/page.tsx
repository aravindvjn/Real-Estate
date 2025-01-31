"use server";
import HeaderNav from "@/components/header/header-nav";
import FilterProperties from "@/components/properties-page/filter-properties";
import React from "react";

export type PropertySearchParams = {
  searchParams?: {
    type?: "rent" | "sale";
    category?: "luxury" | "new";
    location?: string;
    search?: string;
    bedroom?: number;
    bathroom?: number;
    garage?: number;
    minPrice?: number;
    maxPrice?: number;
    size?: number;
    owner_id?: string;
  };
};

const Page = async ({ searchParams }: PropertySearchParams) => {
  const data = await searchParams;
  return (
    <div>
      <HeaderNav />
      <FilterProperties searchParams={data} />
    </div>
  );
};

export default Page;
