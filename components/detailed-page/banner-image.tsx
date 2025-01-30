import React from "react";

const BannerImage = ({
  title,
  image,
  price,
}: {
  title: string;
  image: string;
  price: string;
}) => {
  return (
    <div
      className="w-full h-[350px] sm:h-[450px] flex bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image})`,
      }}
    >
      <div className="self-end p-5 md:p-10 bg-black/50 text-white">
        <p className="text-xl md:text-3xl font-bold capitalize">{title}</p>
        <p className="text-lg md:text-2xl">Rs.{price}</p>
      </div>
    </div>
  );
};

export default BannerImage;
