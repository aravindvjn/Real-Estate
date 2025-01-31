import React from "react";
import Card from "../cards/card";
import { IoArrowForward } from "react-icons/io5";
import { getSuggestion } from "@/lib/functions/getSuggestions";
import { PropertyTypes } from "../cards/type";
import Link from "next/link";

async function Suggestions() {
  const properties: PropertyTypes[] = await getSuggestion();

  if (!properties) {
    return null;
  }

  return (
    <div id="homesforyou" className="flex justify-center flex-col items-center my-1 rounded py-[50px] px-0 sm:px-[50px] md:px-[100px] lg:px-[200px]">
      <p className="text-sm font-semibold" >
        Homes For You
      </p>
      <p className="text-[10px]">We’ve handpicked some suggestions just for you ❤️</p>
      <div className="mt-5 flex overflow-x-scroll sm:overflow-hidden sm:grid grid-cols-3 gap-2 md:gap-4  lg:gap-6 items-center w-full pl-2 sm:pl-0">
        {properties.map((property) => (
          <Card key={property.id} {...property} />
        ))}
      </div>
      <Link href={'/properties'} className="px-4 py-1 rounded-full bg-yellow-300 text-[12px] flex items-center gap-1 mt-10">
        See All <IoArrowForward />
      </Link>
    </div>
  );
}

export default Suggestions;
