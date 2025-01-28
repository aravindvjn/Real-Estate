import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchInput() {
  return (
    <div className="flex w-3/4 sm:w-1/3 lg:w-1/4 justify-center relative">
      <input
        type="search"
        className="px-4 h-9 flex items-center rounded-full text-black placeholder:text-[10px] placeholder:text-black w-full"
        placeholder="Enter Name, Keywords.."
      />
      <button className="absolute right-1 top-1 h-7 w-7 rounded-full bg-yellow-300 flex justify-center items-center">
        <CiSearch size={15} color="black" />
      </button>
    </div>
  );
}

export default SearchInput;
