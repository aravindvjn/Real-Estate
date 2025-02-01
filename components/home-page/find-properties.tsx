"use server";
import React from "react";
import { FindPropertiesCellProps } from "./types";
import image from "@/assets/images/image-6.jpg";
import { CitiesProps, getCities } from "@/lib/functions/getCities";
import Link from "next/link";

async function FindPropertiesByCities() {
  const cities: CitiesProps[] = await getCities();
  return (
    <div
      id="cities"
      className="grid grid-cols-3 gap-2 lg:grid-cols-4 sm:gap-3 md:gap-4 px-[10px] sm:px-[50px] md:px-[100px] lg:px-[200px] mb-[100px]"
    >
      {cities.map((city, index) => {
        return (
          <SingleCell
            key={index}
            city={city.city}
            image_url={city.image_url}
            no_properties={city.no_properties}
          />
        );
      })}
    </div>
  );
}

const SingleCell = ({
  city,
  image_url,
  no_properties,
}: FindPropertiesCellProps) => {
  return (
    <Link
      href={`/properties?location=${city}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${
          image_url || image.src
        })`,
      }}
      className={`rounded-lg cursor-pointer bg-center bg-cover p-3 md:p-5 text-[12px]  h-[180px] sm:h-[250px] md:h-[300px] lg:h-[400px] text-white`}
    >
      <p className="text-[10px] py-1">{no_properties} Properties</p>
      <p className="font-semibold">{city}</p>
    </Link>
  );
};
export default FindPropertiesByCities;
