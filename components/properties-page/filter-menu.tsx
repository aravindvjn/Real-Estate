"use client";
import React, { useState } from "react";
import { FilterOptionsComponent } from "./filter-options";

const FilterMenu = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div  className="lg:hidden">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="flex items-center px-3 py-1 text-sm  focus:ring-offset-gray-100 bg-blue-600 text-white focus:ring-blue-500 mt-3 rounded"
      >{show?"Hide":"Show"} Filter</button>
      {show && (
        <div className="text-[12px]">
          <FilterOptionsComponent />
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
