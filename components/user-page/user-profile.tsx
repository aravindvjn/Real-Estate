import React from "react";
import Image from "next/image";
import { VscAccount } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { UserType } from "../header/type";

const UserProfiles = ({
  email,
  first_name,
  last_name,
  role,
  location,
  profile_picture_url,
  created_at
}: UserType) => {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row gap-3 sm:gap-5 sm:justify-start p-5 md:p-10 md:text-sm">
      {profile_picture_url ? (
        <Image
          className="rounded-full aspect-square object-cover"
          src={profile_picture_url}
          alt={`profile of ${first_name}`}
          height={150}
          width={150}
        />
      ) : (
        <VscAccount size={150} />
      )}
      <div className="flex flex-col items-center sm:items-start text-[12px] md:text-sm gap-1">
        <h3 className="font-bold text-md sm:text-xl lg:text-2xl">
          {first_name} {last_name}
        </h3>

        <p className="flex gap-1 items-center">
          <MdEmail />
          {email}
        </p>
        <p className="flex gap-1 items-center">
          <FaLocationPin />
          {location}
        </p>
        <p className="px-4 py-1 rounded-full bg-blue-600 text-white font-semibold w-fit capitalize">
          {role}
        </p>
      </div>
    </div>
  );
};

export default UserProfiles;
