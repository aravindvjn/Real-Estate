"use client";
import React, { useActionState, useState } from "react";
import Input from "../ui/input";
import PreviewImage from "../helpers/preview-image";
import { addProperty } from "@/lib/actions/add-property";

const AddPropertyForm = () => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    addProperty.bind(null, selectedImage),
    {
      message: [""],
    }
  );

  return (
    <div className="p-5 md:px-10">
      <p className="font-semibold">Add New Property</p>
      <form
        action={formAction}
        className="text-[12px] max-w-[450px] flex flex-col gap-4"
      >
        <Input name="title" required />
        <Input name="location" required />
        <PreviewImage
          minimum={2}
          multiple
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <p className="text-sm font-semibold">Features</p>
        <Input name="bedrooms" type="number" required />
        <Input name="bathrooms" type="number" required />
        <Input name="garage" type="number" required />
        <Input name="size in sq.mtr" type="number" required />
        <Input name="price" type="number" required />
        <Input
          name="features"
          type="text"
          onlyPlaceholder="Pool Area, Balcony etc"
          required
        />
        {state?.message.length > 0 &&
          state?.message?.map((msg, index) => (
            <p className="text-red-500" key={index}>
              {msg}
            </p>
          ))}
        <button
          disabled={selectedImage.length < 2}
          className="px-3 py-2 rounded border bg-blue-600 text-white"
        >
          {isPending ? "Submiting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
