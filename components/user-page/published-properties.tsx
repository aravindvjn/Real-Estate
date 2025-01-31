import React from "react";
import FilteredData from "../properties-page/filtered-data";


const PublishedProperties = ({
  searchParams,
}: {
  searchParams: { owner_id: string };
}) => {
  return (
    <div className="px-3 sm:px-5 md:px-[50px]">
        <p className="text-lg md:text-xl font-bold">Published Properties</p>
      <FilteredData noOptions searchParams={searchParams} />
    </div>
  );
};

export default PublishedProperties;
