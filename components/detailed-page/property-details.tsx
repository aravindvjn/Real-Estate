import React from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { LuScale3D } from "react-icons/lu";
import { PiGarageFill } from "react-icons/pi";

type PropertyDetailsProps = {
  location: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  price: string;
  description: string;
};

const PropertyDetails = ({
  bathrooms,
  bedrooms,
  garage,
  location,
  price,
  size,
  description,
}: PropertyDetailsProps) => {
  return (
    <div className="flex flex-col md:gap-2 md:order-2 pt-5">
      <p className="text-lg md:text-xl font-bold">Property Details</p>
      <p className="py-2 ">{description}</p>
      <div className=" mt-2 text-gray-600 flex flex-col gap-2">
        <p className=" flex gap-3 items-center">
          <IoLocation /> {location}
        </p>
        <p className="flex gap-3 items-center">
          <LuScale3D /> {size} sq.ft
        </p>
        <p className="flex items-center gap-3 ">
          <FaBed />
          {bedrooms} Bedrooms
        </p>
        <p className="flex items-center gap-3 ">
          <FaBath />
          {bathrooms} bathrooms
        </p>
        <p className="flex items-center gap-3">
          <PiGarageFill />
          {garage} Garage
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
