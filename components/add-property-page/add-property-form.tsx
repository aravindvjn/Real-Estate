"use client";
import React, { useState } from "react";
import Input from "../ui/input";
import PreviewImage from "../helpers/preview-image";

const AddPropertyForm = () => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  return (
    <div className="p-5 md:px-10">
      <p className="font-semibold">Add New Property</p>
      <form action="" className="text-[12px]">
        <Input name="title" />
        <Input name="location" />
        <PreviewImage
          multiple
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <p className="text-sm font-semibold">Features</p>
        <Input name="bedrooms" type="number" />
        <Input name="bathrooms" type="number" />
        <Input name="garage" type="number" />
        <Input name="size in sq.mtr" type="number" />
        <Input name="price" type="number" />
        <Input
          name="features"
          type="text"
          onlyPlaceholder="Pool Area, Balcony etc"
        />
      </form>
    </div>
  );
};

export default AddPropertyForm;
