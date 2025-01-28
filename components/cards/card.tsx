import React from "react";
import image from "@/assets/images/image-3.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdOutlinePhotoSizeSelectSmall } from "react-icons/md";

function Card({ imageUrl = image.src }) {
  return (
    <div
      className="cursor-pointer rounded-lg bg-white aspect-[9/12] flex flex-col justify-between bg-cover bg-center p-1 sm:p-2  lg:p-4 w-full text-[12px]"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <button className="text-[10px] self-start px-2 flex items-center h-6 rounded-lg bg-green-700 text-white font-semibold">FOR SALE</button>
      <div className="p-2 bg-white flex flex-col rounded-md gap-0.5 md:gap-1.5">
        <p className="font-semibold ">Akyper Pool Apartment</p>
        <p className="flex items-center opacity-80">
          <IoLocationOutline />
          1020 Blomingdale Ave
        </p>
        <div className="flex justify-between gap-4">
          <p className="text-orange-500 font-semibold">$280,000</p>
          <div className="flex items-center gap-3 opacity-80">
            <span className="flex items-center gap-0.5 lg:gap-1">
              <FaBed size={12} />3
            </span>
            <span className="flex items-center gap-0.5 lg:gap-1">
              <FaBath size={12} />2
            </span>
            <span className="flex items-center gap-0.5 lg:gap-1">
              <MdOutlinePhotoSizeSelectSmall size={12} />4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
