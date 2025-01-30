"use client";
import React, { useState } from "react";
import SelectOptions from "./select-options";
import { select_options } from "./options";
import SelectRange from "./select-range";
import Options from "../ui/options";
import { useRouter } from "next/navigation";

const FilterOptions = () => {
  return (
    <div className="hidden lg:flex w-[200px] flex-col">
      <FilterOptionsComponent />
    </div>
  );
};

export default FilterOptions;

export const FilterOptionsComponent = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const router = useRouter()
  const formAction = (formData: FormData) => {
    const type = formData.get("type");
    const bedroom = formData.get("bedroom");
    const bathroom = formData.get("bathroom");
    const garage = formData.get("garage");
    const size = formData.get("size");
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    router.push(`/properties?type=${type}&bedroom=${bedroom}&bathroom=${bathroom}&garage=${garage}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}`)

  };

  return (
    <form action={formAction}>
      <p className="text-lg md:text-xl font-bold py-2">Filter</p>
      <SelectRange priceRange={priceRange} setPriceRange={setPriceRange} />
      <div className="pb-3">
        <Options
          defaultValue={"Select type"}
          name={"type"}
          options={[
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
