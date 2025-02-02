import React from "react";
import image from "@/assets/images/image-3.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { PropertyTypes } from "./type";
import { LuScale3D } from "react-icons/lu";
import Link from "next/link";
import { formatINR } from "@/globals/helper/formateMoney";

function Card({
  image_urls = [image.src],
  bathrooms,
  bedrooms,
  size,
  title,
  price,
  location,
  id,
  type,
  sold,
}: PropertyTypes) {
  return (
    <Link
      href={`/properties/${id}`}
      className="cursor-pointer shadow-md rounded-lg bg-white aspect-[9/12] flex flex-col justify-between bg-cover bg-center p-1 sm:p-2 lg:p-4 min-w-[150px] w-full text-[10px] sm:text-[12px] "
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image_urls[0]})`,
      }}
    >
      <button
        className={`text-[10px] self-start px-2 sm:px-3  flex items-center h-6 sm:text-[12px] sm:h-7 rounded-lg ${
          sold ? "bg-red-500" : type === "rent" ? "bg-blue-500" : "bg-green-700"
        } text-white font-semibold uppercase`}
      >
        {sold ? "SOLD" : `FOR ${type}`}
      </button>
      <div className="p-2 bg-white text-[10px] sm:text-[12px] flex flex-col rounded-md gap-0.5 md:gap-1.5">
        <p className="font-semibold line-clamp-1">{title}</p>
        <p className="flex items-center gap-1 line-clamp-1 opacity-80">
          <IoLocationOutline />
          {location}
        </p>
        <p className=" opacity-70 flex items-center gap-1">
          <LuScale3D size={12} />
          {size} sq.ft
        </p>
        <div className="flex  flex-col sm:flex-row justify-between sm:gap-4 ">
          <p className="text-orange-500 order-2 sm:order-1 font-semibold">
            Rs.{formatINR(Number(price))}
          </p>
          <div className="flex order-1 sm:order-2 items-center gap-3 opacity-80">
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
