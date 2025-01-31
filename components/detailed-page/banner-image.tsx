import { formatINR, numberToWords } from "@/globals/helper/formateMoney";
import React from "react";

const BannerImage = ({
  title,
  image,
  price,
  type,
}: {
  title: string;
  image: string;
  price: string;
  type: string;
}) => {
  return (
    <div
      className="w-full h-[350px] sm:h-[450px] flex flex-col justify-between bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image})`,
      }}
    >
      <p
        className={`text-sm md:text-xl uppercase p-3  w-fit text-white font-bold ${
          type === "rent" ? "bg-blue-600" : "bg-green-700"
        }`}
      >
        FOR {type}
      </p>
      <div className="p-5 md:p-10 w-fit bg-black/50 text-white">
        <p className="text-xl md:text-3xl font-bold capitalize">{title}</p>
        <p className="text-lg md:text-2xl">Rs.{formatINR(Number(price))}</p>
        <p className="text-[12px]">{numberToWords(Number(price))}</p>
      </div>
    </div>
  );
};

export default BannerImage;
