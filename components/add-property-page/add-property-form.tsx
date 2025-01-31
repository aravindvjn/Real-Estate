"use client";
import React, { useActionState, useState } from "react";
import Input from "../ui/input";
import PreviewImage from "../helpers/preview-image";
import { addProperty } from "@/lib/actions/add-property";

const AddPropertyForm = () => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    addProperty.bind(null, selectedImage),
    { message: [] }
  );

  return (
    <div className="p-5 md:px-10">
      <p className="font-semibold">Add New Property</p>
      <form
        action={formAction}
        className="text-[12px] max-w-[450px] flex flex-col gap-4"
      >
        <Input name="title" defaultValue={state?.data?.title || ""} required />
        <Input
          name="location"
          defaultValue={state?.data?.location || ""}
          required
        />
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
        <Input
          name="size_sqft"
          type="number"
          placeholder="Size in sq.ft"
          required
        />

        <div className="flex flex-col">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className="px-3 py-2 rounded-lg border"
            defaultValue=""
            name="type"
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
          name="features"
          type="text"
          placeholder="Pool Area, Balcony etc"
          required
        />

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="About the property..."
            className="rounded-lg border px-3 py-2"
            required
          />
        </div>

        <Input
          name="price"
          type="number"
          placeholder="Price in INR"
          defaultValue={state?.data?.price || ""}
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
