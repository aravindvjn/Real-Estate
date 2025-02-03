import React from "react";
import { DetailedGuidesType } from "../guides";
import Thumbnail from "../../detailed-blog/thumbnail";

const DetailedGuide = ({
  description,
  details,
  image,
  title,
  children
}: DetailedGuidesType) => {
  return (
    <div className="p-5 rounded-lg m-5 bg-white shadow-md">
      <h1 className="text-[14px] sm:text-lg font-bold md:font-xl xl:text-2xl">{title}</h1>
      <Thumbnail alt={title} src={image} />
      <p className="font-semibold py-3">{description}</p>
      <p>{details}</p>
      {children}  {/*  to add More data about the author */}
    </div>
  );
};

export default DetailedGuide;
