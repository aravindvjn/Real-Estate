"use client";
import React, { useState } from "react";
import SelectOptions from "./select-options";
import { select_options } from "./options";
import SelectRange from "./select-range";
import Options from "../ui/options";
import { useRouter, useSearchParams } from "next/navigation";
import SortBy from "./sort-by";

export type SortType = "asc" | "desc" | undefined;

const FilterOptions = () => {
  return (
    <div className="hidden lg:flex w-[200px] flex-col">
      <FilterOptionsComponent />
    </div>
  );
};

export default FilterOptions;

export const FilterOptionsComponent = () => {

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const router = useRouter();

  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") as SortType;

  const [sortBy, setSortBy] = useState<SortType>(sort || undefined);

  //pushing to different paths based on the inputs
  const formAction = (formData: FormData) => {

    const type = formData.get("type");
    const bedroom = formData.get("bedroom");
    const bathroom = formData.get("bathroom");
    const garage = formData.get("garage");
    const size = formData.get("size");
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    const sort = sortBy;

    router.push(
      `/properties?type=${type}&bedroom=${bedroom}&bathroom=${bathroom}&garage=${garage}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
    );

  };

  return (
    <form action={formAction}>
      <p className="text-lg md:text-xl font-bold pb-2">Sort By</p>
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      <p className="text-lg md:text-xl font-bold pt-4">Filter</p>
      <SelectRange priceRange={priceRange} setPriceRange={setPriceRange} />
      <div className="pb-3">
        <Options
          name={"type"}
          options={[
            { value: "", label: "Select a type" },
            { value: "sale", label: "Sale" },
            { value: "rent", label: "Rent" },
          ]}
        />
      </div>
      <SelectOptions group={select_options} />
      <button
        type="submit"
        className="mt-3 py-2 px-3 w-fit text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Apply
      </button>
    </form>
  );
};
