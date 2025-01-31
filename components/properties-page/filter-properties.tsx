import React from "react";
import FilterOptions from "./filter-options";
import type { PropertySearchParams } from "@/app/properties/page";
import FilteredData from "./filtered-data";

const FilterProperties = async ({
  searchParams,
}: PropertySearchParams) => {
  return (
    <div className="p-3 sm:p-5 lg:flex justify-center  lg:gap-10 lg:px-[50px]">
      <FilterOptions />
      <FilteredData searchParams={searchParams} />
    </div>
  );
};

export default FilterProperties;
