import React from "react";
import { BasicUserDataType } from "./type";
import { signOut } from "next-auth/react";
import Image from "next/image";

const UserPopDetails = ({
  email,
  first_name,
  last_name,
  profile_picture_url,
}: BasicUserDataType) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Image
        className="rounded-full"
        src={profile_picture_url}
        alt={first_name}
        height={100}
        width={100}
      />
      <p className="font-semibold text-sm">
        {first_name} {last_name}
      </p>
      <p className="opacity-70">{email}</p>
      <button
        onClick={() => signOut()}
        className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-red-600 hover:text-white"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserPopDetails;
