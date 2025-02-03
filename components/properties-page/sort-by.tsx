
import React, { Dispatch, SetStateAction } from "react";
import { SortType } from "./filter-options";

type SortPropType = {
  sortBy: SortType;
  setSortBy: Dispatch<SetStateAction<SortType>>;
};
const SortBy = ({ setSortBy, sortBy }: SortPropType) => {
  return (
    <div className="flex text-[12px] flex-wrap items-center gap-3 ">
      <button
        type="button"
        className={`px-3 py-1 rounded  ${
          sortBy === undefined ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setSortBy(undefined)}
      >
        Latest
      </button>
      <button
        type="button"
        className={`px-3 py-1 rounded  ${
          sortBy === "desc" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setSortBy("desc")}
      >
        High to Low Price
      </button>
      <button
        type="button"
        className={`px-3 py-1 rounded  ${
          sortBy === "asc" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setSortBy("asc")}
      >
        Low to Hight Price
      </button>
    </div>
  );
};

export default SortBy;
