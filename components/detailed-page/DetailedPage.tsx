import React from "react";
import { PropertyTypes } from "../cards/type";
import ImageSlideShow from "./image-slide-show";
import { GoDotFill } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { PiGarageFill } from "react-icons/pi";
import { LuLandPlot } from "react-icons/lu";
type DetailedPageProps = {
  property: PropertyTypes;
};
const DetailedPage = ({ property }: DetailedPageProps) => {
  let additionalFeatures = [];

  if (property.bathrooms > 0) {
    additionalFeatures.push(property.bathrooms + " Bathrooms");
  }
  if (property.garage > 0) {
    additionalFeatures.push(property.garage + " Garage");
  }
  if (property.bedrooms > 0) {
    additionalFeatures.push(property.bedrooms + " Bedrooms");
  }
  return (
    <div className="font-mono w-screen p-5 md:p-10">
      <div className="flex justify-around gap-2 md:gap-5 flex-col md:flex-row">
        <ImageSlideShow image_urls={property.image_urls} />
        <div className="md:w-2/6 flex flex-col md:gap-2 md:self-end">
          <p className="text-xl md:text-3xl font-bold capitalize">
            {property.title}
          </p>
          <p className="text-md md:text-xl mt-2 text-gray-600 flex gap-3 items-center">
            <IoLocation /> {property.location}
          </p>
          <p className="text-md md:text-xl text-gray-600 flex gap-3 items-center">
            <LuLandPlot /> {property.size} sq.mtr
          </p>
          <div className="flex items-center gap-3 md:gap-5 text-gray-500">
            <p className="flex font-semibold items-center gap-3 text-xl">
              <FaBed className="text-lg md:text-2xl" />
              {property.bedrooms}
            </p>
            <div className="w-[1px] bg-black h-5"></div>
            <p className="flex font-semibold items-center gap-3 text-xl">
              <FaBath className="text-sm md:text-xl" />
              {property.bathrooms}
            </p>
            <div className="w-[1px] bg-black h-5"></div>
            <p className="flex font-semibold items-center gap-3 text-xl">
              <PiGarageFill className="text-lg md:text-2xl" />
              {property.garage}
            </p>
          </div>
          <p className="text-xl md:text-3xl font-bold text-orange-600">
            Rs.{property.price}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xl md:text-2xl font-semibold mt-2">Features</p>
        {[...additionalFeatures, ...property.features].map((feature, index) => (
          <p
            key={index}
            className="text-md md:text-xl md:mt-2 flex items-center gap-2"
          >
            <GoDotFill />
            {feature}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailedPage;
