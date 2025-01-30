import HeaderNav from "@/components/header/header-nav";
import FilterProperties from "@/components/properties-page/filter-properties";
import { getFilteredProperties } from "@/lib/functions/getFilteredProperties";
import React from "react";

type ParamsProps = {
  searchParams: {
    type: "rent" | "sale";
    category: "luxury" | "new";
    location: string;
    search: string;
  };
};

const Page = async ({ searchParams }: ParamsProps) => {
  const { type, category, location, search } = await searchParams;
  const properties = await getFilteredProperties({
    type,
    category,
    location,
    search,
  });
  return (
    <div>
      <HeaderNav />
      <FilterProperties properties={properties} />
    </div>
  );
};

export default Page;
