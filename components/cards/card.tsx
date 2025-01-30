import React from "react";
import image from "@/assets/images/image-3.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { PropertyTypes } from "./type";
import { LuScale3D } from "react-icons/lu";
import Link from "next/link";

function Card({
  image_urls = [image.src],
  bathrooms,
  bedrooms,
  size,
  title,
  price,
  location,
  id,
}: PropertyTypes) {
  return (
    <Link
      href={`/properties/${id}`}
      className="cursor-pointer shadow-md rounded-lg bg-white aspect-[9/12] flex flex-col justify-between bg-cover bg-center p-1 sm:p-2  lg:p-4 w-full text-[12px]"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image_urls[0]})`,
      }}
    >
      <button className="text-[10px] self-start px-2 flex items-center h-6 rounded-lg bg-green-700 text-white font-semibold">
        FOR SALE
      </button>
      <div className="p-2 bg-white flex flex-col rounded-md gap-0.5 md:gap-1.5">
        <p className="font-semibold ">{title}</p>
        <p className="flex items-center gap-1 opacity-80">
          <IoLocationOutline />
          {location}
        </p>
        <p className="text-[10px] opacity-70 flex items-center gap-1">
          <LuScale3D size={12} />
          {size} sq.ft
        </p>
        <div className="flex justify-between gap-4">
          <p className="text-orange-500 font-semibold">Rs.{price}</p>
          <div className="flex items-center gap-3 opacity-80">
            <span className="flex items-center gap-0.5 lg:gap-1">
              <FaBed size={12} />
              {bedrooms}
            </span>
            <span className="flex items-center gap-0.5 lg:gap-1">
              <FaBath size={12} />
              {bathrooms}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
