"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const ImageSlideShow = ({ image_urls }: { image_urls: string[] }) => {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [width, setWidth] = useState(0);

  //getting the width of the window to set the image width
  useEffect(() => {

    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const no_images = image_urls?.length;

  //handlers for changing the image index when arrow buttons are clicked
  const changeImageHandler = (forward: boolean) => {

    if (forward) {

      setCurrentIndex((prev) => {
        return prev === no_images - 1 ? 0 : prev + 1;
      });

    } else {

      setCurrentIndex((prev) => {
        return prev === 0 ? no_images - 1 : prev - 1;
      });
      
    }
  };

  const classes =
    "bg-black/40 rounded h-10 w-10 md:h-16 md:w-16 flex justify-center items-center text-white backdrop-blur-lg";

  return (
    <div className="relative flex md:w-3/5 gap-3 z-0 ">

      <Image
        src={image_urls[currentIndex] || image_urls[0]}
        className="rounded overflow-hidden w-full aspect-[4/3] object-cover"
        alt="property image"
        height={width}
        width={width}
      />

      <div className="absolute left-0  md:px-5 w-full flex top-1/2 -translate-y-1/2 justify-between">

        <button
          disabled={currentIndex === 0}
          onClick={changeImageHandler.bind(null, false)}
          className={`${classes} ${currentIndex === 0 ? "invisible" : ""}`}
        >
          <IoArrowBack size={30} />
        </button>
        <button
          disabled={currentIndex === no_images - 1}
          onClick={changeImageHandler.bind(null, true)}
          className={`${classes} ${
            currentIndex === no_images - 1 ? "invisible" : ""
          }`}
        >
          <IoArrowForward size={30} />
        </button>
        
      </div>

    </div>
  );
};

export default ImageSlideShow;
