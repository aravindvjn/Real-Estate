"use server";
import FilterProperties from "@/components/properties-page/filter-properties";
import { getFilteredPropertiesProps } from "@/lib/functions/getFilteredProperties";
import React from "react";

export type PropertySearchParams = {
  searchParams?: getFilteredPropertiesProps;
};

const Page = async ({ searchParams }: PropertySearchParams) => {
  const data = await searchParams;
  return (
    <div>
      <FilterProperties searchParams={data} />
    </div>
  );
};

export default Page;
