"use client";
import React, { useActionState, useRef, useState } from "react";
import Input from "../ui/input";
import Container from "../ui/container";
import { createUser } from "@/lib/actions/create-user";
import Image from "next/image";

const CreateUser = ({ session }: any) => {
  const [selectedImage, setSelectedImage] = useState<any>();
  const imageRef = useRef(null);
  const [state, formAction, isPending] = useActionState(createUser, {
    message: [""],
  });

  const pickImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      const image = event.target.files[0];
      if (!image.type.startsWith("image/")) {
        alert("Please select a valid image.");
        return;
      }
      setSelectedImage(image);
    }
  };

  const triggerImageHandler = () => {
    imageRef.current?.click();
  };

  const imageURL = selectedImage
    ? URL.createObjectURL(selectedImage)
    : session?.user?.image;

  return (
    <Container center className="min-h-dvh bg-white-1 w-full px-5">
      <form
        action={formAction}
        className="p-5 rounded flex flex-col gap-2 text-[12px] w-full sm:max-w-[400px]"
      >
        <label htmlFor="image">Profile Picture</label>
        <input
          ref={imageRef}
          name="profile_picture_url"
          type="file"
          hidden
          value={undefined}
          accept="image/jpeg, image/png"
          onChange={pickImageHandler}
        />
        <Image
          src={imageURL}
          height={200}
          width={200}
          onClick={triggerImageHandler}
          alt="profile picture"
        />
        <Input placeholder="First Name" name="first_name" required />
        <Input placeholder="Last Name" name="last_name" required />
        <Input placeholder="Phone Number" name="phone_number" required />
        <label htmlFor="Role">Role</label>
        <select
          required
          id="Role"
          className="px-3 py-2 rounded-lg"
          defaultValue="Select a role"
          name="role"
        >
          <option disabled value="Select a role">
            Select a role
          </option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
        </select>
        <Input name="location" required />
        {state?.message?.length > 0 && (
          <ul>
            {state?.message?.map((msg, index) => (
              <li key={index} className="text-red-600">
                {msg}
              </li>
            ))}
          </ul>
        )}
        <button
          className="bg-white rounded py-2"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create User"}
        </button>
      </form>
    </Container>
  );
};
export default CreateUser;
