import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OpportunityCellProps } from "./options";

const GridCell = ({
  title,
  description,
  link,
  image,
  image_className,
  button_text
}: OpportunityCellProps) => {
  return (
    <div className="flex flex-col rounded-md gap-2 shadow-md text-[14px] overflow-hidden">
      <Image
        className={`w-full flex ${image_className}`}
        src={image}
        alt={title}
        height={400}
        width={400}
      />
      <div className="flex flex-col rounded-md gap-2 p-2 px-3 sm:px-5 pb-3 sm:pb-5 shadow-md text-[14px]">
        <p className="text-md sm:text-lg font-bold">{title}</p>
        <p className="text-[12px] sm:text-sm">{description}</p>
        <Link
          className="px-3 py-2 bg-blue-600 rounded text-white w-fit"
          href={link}
        >
          {button_text || "Click here"}
        </Link>
      </div>
    </div>
  );
};

export default GridCell;
