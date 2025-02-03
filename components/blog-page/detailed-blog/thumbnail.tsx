"use client";

import { imageLoader } from "@/globals/helper/image-loader";
import Image from "next/image";
import React from "react";

const Thumbnail = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <Image
      loader={imageLoader}
      className="flex object-contain rounded"
      src={src}
      alt={alt}
      height={400}
      width={400}
    />
  );
};

export default Thumbnail;
