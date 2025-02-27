"use client";
import React, { useEffect, useState } from "react";
import { FilterOptionsComponent } from "./filter-options";
import { IoFilter } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

const FilterMenu = () => {
  const [show, setShow] = useState<boolean>(false);

  const searchParams = useSearchParams(); 

  useEffect(() => {
    setShow(false);
  }, [ searchParams.toString()]); 
  
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="flex items-center px-3 py-1 text-sm focus:ring-offset-gray-100 border focus:ring-blue-500 mt-3 gap-1 rounded"
      >
        <IoFilter /> {show ? "Hide" : "Show"} Filter
      </button>
      {show && (
        <div className="text-[12px]">
          <FilterOptionsComponent />
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
