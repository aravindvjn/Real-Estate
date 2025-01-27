import React from "react";
import { IoMenu } from "react-icons/io5";
import HeaderDropDown from "./header-dropdown";
import { CiSearch } from "react-icons/ci";
import { options } from "./options";
function HeroSection() {
  return (
    <div
      style={{ backgroundImage: "url('/hero-background.jpg')" }}
      className="w-full aspect-[1.2] sm:aspect-[2.5] bg-cover rounded-lg text-[10px] sm:text-[12px] items-center bg-center"
    >
      <div className="p-3 flex justify-between text-white">
        <div className="flex items-center gap-2">
          <IoMenu className="sm:hidden text-white" size={22} />
          <p className="font-semibold">JustHome</p>
        </div>
        <HeaderDropDown options={options} />
        <div className="flex gap-2 sm:gap-3 items-center">
          <p>+6893788736</p>
          <button className="px-2 border rounded-full">Add Property</button>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center h-full text-white">
        <button className="border rounded-full px-4 py-1 hover:bg-black hover:bg-opacity-45">
          LET US GUIDE YOUR HOME
        </button>
        <p className="text-[20px] md:text[35px] lg:text-[50px] font-bold">
          Discover a place you'll love to live
        </p>
        <div className="flex gap-3 text-[10px] pt-3">
          <p>Sale</p>
          <p>Rent</p>
        </div>
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
      </div>
    </div>
  );
}

export default HeroSection;
