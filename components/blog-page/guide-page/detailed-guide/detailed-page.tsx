import React from "react";
import { DetailedGuidesType } from "../guides";
import Image from "next/image";

const DetailedGuide = ({
  description,
  details,
  id,
  image,
  link,
  title,
}: DetailedGuidesType) => {
  return (
    <div className="p-5 rounded-lg m-5 shadow-md">
      <h1 className="text-[14px] sm:text-lg font-bold md:font-xl xl:text-2xl">{title}</h1>
      <Image className="rounded" alt={title} src={image} height={500} width={500} />
      <p className="font-semibold py-3">{description}</p>
      <p>{details}</p>
    </div>
  );
};

export default DetailedGuide;
