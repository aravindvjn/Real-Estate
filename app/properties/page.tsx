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
    bedroom: number;
    bathroom: number;
    garage: number;
    minPrice: number;
    maxPrice: number;
    size: number;
  };
};

const Page = async ({ searchParams }: ParamsProps) => {
  const {
    type,
    location,
    search,
    category,
    bedroom,
    bathroom,
    garage,
    minPrice,
    maxPrice,
    size,
  } = await searchParams;

  const properties = await getFilteredProperties({
    type,
    location,
    search,
    category,
    bedroom,
    bathroom,
    garage,
    minPrice,
    maxPrice,
    size,
  });

  return (
    <div>
      <HeaderNav />
      <FilterProperties properties={properties} />
    </div>
  );
};

export default Page;
