import React from "react";
import { PropertyTypes } from "../cards/type";
import Card from "../cards/card";
import FilterOptions from "./filter-options";
import SearchInput from "../home-page/search-input";
import { BsFillHouseExclamationFill } from "react-icons/bs";
import Container from "../ui/container";
import FilterMenu from "./filter-menu";

const FilterProperties = ({ properties }: { properties: PropertyTypes[] }) => {
  return (
    <div className="p-5 lg:flex justify-center  lg:gap-10 lg:px-[50px]">
      <FilterOptions />
      <div className="flex-grow">
        <div className="flex pb-4 flex-col">
          <SearchInput full />
          <FilterMenu />
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {properties?.length > 0 &&
            properties.map((property) => (
              <Card key={property.id} {...property} />
            ))}
        </div>
        {properties.length === 0 && (
          <Container
            center
            className="pt-[100px] opacity-70 flex-col text-[12px] text-center"
          >
            <BsFillHouseExclamationFill size={30} />
            <p>No properties found</p>
          </Container>
        )}
      </div>
    </div>
  );
};

export default FilterProperties;
