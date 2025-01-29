"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { BiArrowBack } from "react-icons/bi";
import { IoArrowForward } from "react-icons/io5";

type PreviewImageProps = {
  setSelectedImage: (image: string[]) => void;
  selectedImage: string[];
  initialImage?: string;
  multiple?: boolean;
  minimum?: number;
};

const PreviewImage = ({
  setSelectedImage,
  selectedImage = [],
  initialImage,
  multiple,
  minimum,
}: PreviewImageProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.5, 
      maxWidthOrHeight: 1024, 
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error("Image compression failed:", error);
      return null;
    }
  };

  const pickImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const compressedImages = await Promise.all(
        Array.from(files).map((file) => compressImage(file))
      );

      // Filter out any failed compression results
      const validImages = compressedImages.filter((img): img is string => img !== null);

      setSelectedImage(validImages);
      setCurrentImageIndex(0);
    }
  };

  const triggerImageHandler = () => {
    imageRef.current?.click();
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < selectedImage.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedImage.length - 1
    );
  };

  const displayImage =
    selectedImage.length > 0 ? selectedImage[currentImageIndex] : initialImage;

  return (
    <div>
      <input
        ref={imageRef}
        type="file"
        hidden
        multiple={multiple}
        accept="image/jpeg, image/png"
        onChange={pickImageHandler}
      />
      <div className="flex gap-3 items-end">
        {displayImage && (
          <div className="flex-col">
            {minimum && selectedImage.length < minimum && (
              <p className="text-red-500">Minimum {minimum} images are required.</p>
            )}
            <Image
              src={displayImage}
              className={
                minimum && selectedImage.length >= minimum
                  ? ""
                  : "border-2 border-red-500"
              }
              height={200}
              width={200}
              onClick={triggerImageHandler}
              alt="Selected Image"
            />
          </div>
        )}
        <button
          type="button"
          className="flex justify-center items-center sm:h-32 sm:w-32 border rounded bg-gray-200 font-semibold"
          onClick={triggerImageHandler}
        >
          {displayImage
            ? "Change Selection"
            : multiple
            ? `Select Images (minimum ${minimum} images)`
            : "Select An Image"}
        </button>
      </div>
      {selectedImage.length > 1 && (
        <div className="flex justify-between items-center w-[200px] -translate-y-7">
          <button
            type="button"
            className="rounded bg-black/50 p-1 backdrop-blur-sm text-white"
            onClick={handlePreviousImage}
          >
            <BiArrowBack size={20} />
          </button>
          <button
            type="button"
            className="rounded bg-black/50 p-1 backdrop-blur-sm text-white"
            onClick={handleNextImage}
          >
            <IoArrowForward size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewImage;
