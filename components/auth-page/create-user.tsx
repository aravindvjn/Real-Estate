"use client";
import React, { useActionState, useEffect, useState } from "react";
import Input from "../ui/input";
import Container from "../ui/container";
import { createUser } from "@/lib/actions/create-user";
import PreviewImage from "../helpers/preview-image";
import { usePathname } from "next/navigation";
import { UserData } from "./type";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any;
  user?: UserData;
  text?:string
};
const CreateUser = ({ session, user,text }: PropType) => {
  const pathName = usePathname();
  const [selectedImage, setSelectedImage] = useState<string[]>([
    user?.profile_picture_url || "",
  ]);
  const [state, formAction, isPending] = useActionState(
    createUser.bind(null, selectedImage, pathName),
    {
      message: [""],
    }
  );
  useEffect(() => {}, [selectedImage, setSelectedImage]);
  return (
    <Container center className="min-h-dvh bg-white-1 w-full px-5">
      <form
        action={formAction}
        className="p-5 rounded flex flex-col gap-2 text-[12px] w-full sm:max-w-[400px]"
      >
        <p className="text-[14px] sm:text-[16px] font-semibold">
          {text ? text : 'Create an account'}
        </p>
        <label htmlFor="image">Profile Picture</label>
        <PreviewImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          initialImage={session?.user?.image}
        />
        <Input
          defaultValue={user?.first_name}
          placeholder="First Name"
          name="first_name"
          required
          minLength={1}
          maxLength={15}
        />
        <Input
          defaultValue={user?.last_name}
          placeholder="Last Name"
          name="last_name"
          required
          minLength={1}
          maxLength={15}
        />
        <Input
          defaultValue={user?.phone_number}
          placeholder="Phone Number"
          name="phone_number"
          pattern="^[6-9]\d{9}$"
          maxLength={10}
          type="tel"
          required
        />
        <label htmlFor="Role">Role</label>
        <select
          required
          id="Role"
          className="px-3 py-2 rounded-lg"
          defaultValue={user?.role || "Select a role"}
          name="role"
        >
          <option disabled value="Select a role">
            Select a role
          </option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
        </select>
        <Input
          defaultValue={user?.location}
          name="location"
          min={2}
          required
          maxLength={150}
        />
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
