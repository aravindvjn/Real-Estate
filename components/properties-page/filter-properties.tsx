import React from "react";
import { PropertyTypes } from "../cards/type";
import Card from "../cards/card";

const FilterProperties = ({ properties }: { properties: PropertyTypes[] }) => {
  return (
    <div className="p-5">
      <div className="grid lg:max-w-[1000px] grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
        {properties?.length > 0 ? (
          properties.map((property) => <Card key={property.id} {...property} />)
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
};

export default FilterProperties;
