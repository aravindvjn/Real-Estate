import React from "react";
import FilteredData from "../properties-page/filtered-data";

const PublishedProperties = ({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}) => {
  return (
    <div className="px-3 sm:px-5 md:px-[50px]">
      <p className="text-lg md:text-xl font-bold">Published Properties</p>
      <FilteredData  searchParams={searchParams} />
    </div>
  );
};

export default PublishedProperties;
