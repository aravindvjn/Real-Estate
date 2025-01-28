import React from "react";
import { FindPropertiesCellProps } from "./types";
import { properties } from "./options";
import image from "@/assets/images/image-6.jpg";

function FindPropertiesByCities() {
  return (
    <div className="grid grid-cols-3 gap-2 lg:grid-cols-4 sm:gap-3 md:gap-4 px-[10px] sm:px-[50px] md:px-[100px] lg:px-[200px] mb-[100px]">
      {properties.map((property, index) => {
        return (
          <SingleCell
            key={index}
            city={property.city}
            image_url={property.image_url}
            no_properties={property.no_properties}
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
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${
          image_url || image.src
        })`,
      }}
      className={`rounded-lg bg-center bg-cover p-3 md:p-5 text-[12px]  h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] text-white`}
    >
      <p className="text-[10px] py-1">{no_properties} Properties</p>
      <p className="font-semibold">{city}</p>
    </div>
  );
};
export default FindPropertiesByCities;
