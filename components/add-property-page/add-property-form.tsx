"use client";
import React, { useActionState, useState } from "react";
import Input from "../ui/input";
import PreviewImage from "../helpers/preview-image";
import { addProperty } from "@/lib/actions/add-property";
import { PropertyTypes } from "../cards/type";
import { usePathname } from "next/navigation";

const AddPropertyForm = ({
  bathrooms = 0,
  bedrooms = 0,
  description = "",
  features = [],
  garage = 0,
  id="",
  image_urls = [],
  location = "",
  owner_id="",
  price = "",
  size = "",
  title = "",
  type,
}: Partial<PropertyTypes>) => {
  const [selectedImage, setSelectedImage] = useState<string[]>(image_urls);
  const pathName = usePathname();
  const [state, formAction, isPending] = useActionState(
    addProperty.bind(null, selectedImage, {
      pathName,
      id,
      real_owner_id: owner_id,
    }),
    { message: [] }
  );

  return (
    <div className="p-5 md:px-10">
      <p className="font-semibold">Add New Property</p>
      <form
        action={formAction}
        className="text-[12px] max-w-[450px] flex flex-col gap-4"
      >
        <Input
          minLength={5}
          maxLength={100}
          name="title"
          defaultValue={title}
          required
        />
        <Input
          minLength={5}
          maxLength={150}
          name="location"
          defaultValue={location}
          required
        />
        <PreviewImage
          minimum={2}
          multiple
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <p className="text-sm font-semibold">Features</p>
        <Input name="bedrooms" type="number" defaultValue={bedrooms} required />
        <Input
          name="bathrooms"
          type="number"
          defaultValue={bathrooms}
          required
        />
        <Input name="garage" type="number" defaultValue={garage} required />
        <Input
          name="size_sqft"
          type="number"
          placeholder="Size in sq.ft"
          defaultValue={size}
          required
        />

        <div className="flex flex-col">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className="px-3 py-2 rounded-lg border"
            name="type"
            defaultValue={type || ""}
            required
          >
            <option disabled value="">
              Select a type
            </option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <Input
          minLength={3}
          maxLength={500}
          name="features"
          type="text"
          placeholder="Pool Area, Balcony etc (use comma)"
          defaultValue={features}
          required
        />

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            minLength={20}
            maxLength={1000}
            id="description"
            name="description"
            placeholder="About the property..."
            className="rounded-lg border px-3 py-2 min-h-[120px]"
            defaultValue={description}
            required
          />
        </div>

        <Input
          name="price"
          type="number"
          placeholder="Price in INR"
          defaultValue={price}
          required
        />

        {state?.message?.length > 0 &&
          state?.message.map((msg, index) => (
            <p className="text-red-500" key={index}>
              {msg}
            </p>
          ))}

        <button
          type="submit"
          disabled={isPending || selectedImage.length < 2}
          className="px-3 py-2 rounded border bg-blue-600 text-white"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
