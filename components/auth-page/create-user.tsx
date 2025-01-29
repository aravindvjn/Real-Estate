"use client";
import React, { useActionState, useEffect, useState } from "react";
import Input from "../ui/input";
import Container from "../ui/container";
import { createUser } from "@/lib/actions/create-user";
import PreviewImage from "../helpers/preview-image";

const CreateUser = ({ session }: any) => {
  const [selectedImage, setSelectedImage] = useState<any>();
  const [state, formAction, isPending] = useActionState(
    createUser.bind(null, selectedImage),
    {
      message: [""],
    }
  );
  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage, setSelectedImage]);
  return (
    <Container center className="min-h-dvh bg-white-1 w-full px-5">
      <form
        action={formAction}
        className="p-5 rounded flex flex-col gap-2 text-[12px] w-full sm:max-w-[400px]"
      >
        <label htmlFor="image">Profile Picture</label>
        <PreviewImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          initialImage={session?.user?.image}
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
