"use server";
import FilterProperties from "@/components/properties-page/filter-properties";
import React from "react";

export type PropertySearchParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: Promise<any>;
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
