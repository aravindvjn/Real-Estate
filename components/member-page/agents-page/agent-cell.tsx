import Image from "next/image";
import React from "react";
import { VscAccount } from "react-icons/vsc";
import { UserType } from "../../header/type";
import { FaLocationPin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

const AgentCell = ({
  first_name,
  last_name,
  profile_picture_url,
  user_id,
  email,
  location,
}: UserType) => {
  return (
    <Link
      href={`/users/${user_id}`}
      className="p-3 sm:p-5 bg-white-0 rounded-lg shadow-md flex gap-3"
    >
      {profile_picture_url ? (
        <Image
          className="rounded-full aspect-square object-cover h-[60px] w-[60px]"
          src={profile_picture_url}
          alt={`profile of ${first_name}`}
          height={60}
          width={60}
        />
      ) : (
        <VscAccount size={150} />
      )}
      <div className="flex flex-col items-start text-[12px] gap-1  overflow-hidden">
        <h3 className="font-bold text-sm md:text-md">
          {first_name} {last_name}
        </h3>
        <p className="flex gap-1 items-center text-">
          <MdEmail />
          {email}
        </p>
        <p className="flex gap-1 items-center text-">
          <FaLocationPin />
          {location}
        </p>
      </div>
    </Link>
  );
};

export default AgentCell;
