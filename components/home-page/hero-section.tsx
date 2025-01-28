import React from "react";
import SearchInput from "./search-input";
import Header from "../header/header";

function HeroSection() {
  return (
    <div
      style={{ backgroundImage: "url('/hero-background.jpg')" }}
      className="w-full aspect-[1.2] sm:aspect-[2.5] bg-cover  text-[10px] sm:text-[12px]  items-center bg-center p-4"
    >
      <Header />
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
