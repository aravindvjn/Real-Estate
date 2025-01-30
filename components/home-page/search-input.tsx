"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchInput({ full }: { full?: boolean }) {
  const searchParam = useSearchParams().get("search");
  const [searchTerm, setSearchTerm] = useState<string>(searchParam || "");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex w-3/4 sm:w-1/3 ${
        full ? "w-full sm:max-w-[500px]  " : "w-1/4"
      } justify-center relative`}
    >
      <input
        type="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 h-9 flex text-[12px] items-center border rounded-full text-black placeholder:text-[12px] placeholder:text-black w-full py-1"
        placeholder="Enter Name, Keywords.."
      />
      <button
        type="submit"
        className="absolute right-1 top-1 h-7 w-7 rounded-full bg-yellow-300 flex justify-center items-center"
      >
        <CiSearch size={15} color="black" />
      </button>
    </form>
  );
}

export default SearchInput;
