import React from "react";
import { IoMenu } from "react-icons/io5";
import HeaderDropDown from "./header-dropdown";
import { options } from "./options";
import SearchInput from "./search-input";
import { VscAccount } from "react-icons/vsc";

function HeroSection() {
  return (
    <div
      style={{ backgroundImage: "url('/hero-background.jpg')" }}
      className="w-full aspect-[1.2] sm:aspect-[2.5] bg-cover  text-[10px] sm:text-[12px]  items-center bg-center p-4"
    >
      <div className="p-3  flex justify-between rounded-full bg-white bg-opacity-80 backdrop-blur-sm px-5 py-2">
        <div className="flex items-center gap-2">
          <IoMenu className="sm:hidden text-white" color="black" size={22} />
          <p className="font-semibold">JustHome</p>
        </div>
        <HeaderDropDown options={options} />
        <div className="flex gap-2 sm:gap-3 items-center">
          <p className="hidden md:flex">+6893788736</p>
          <button>
            <VscAccount size={18} />
          </button>
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
        <SearchInput />
      </div>
    </div>
  );
}

export default HeroSection;
