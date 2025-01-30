import { getUser } from "@/lib/functions/getUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";

const OwnerDetails = async ({ owner_id }: { owner_id: string }) => {
  const user = await getUser(owner_id);
  if (!user) {
    return null;
  }
  return (
    <div className="py-5">
      <p className="text-lg md:text-xl font-bold">Publised By</p>
      <Link
        href={`/user/${user?.user_id}`}
        className="flex gap-3 sm:gap-5 pt-3 w-fit"
      >
        <div>
          <Image
            className="rounded-full h-[60px] w-[60px] sm:h-[90px] sm:w-[90px] md:h-[120px] md:w-[120px]"
            src={user?.profile_picture_url}
            alt={`profile picture of ${user.first_name}`}
            height={150}
            width={150}
          />
        </div>
        <div>
          <p className="font-bold">
            {user.first_name} {user.last_name}
          </p>
          <p className="capitalize">{user?.role}</p>
          <p className="flex gap-1 items-center">
            <MdPhone />
            {user.phone_number}
          </p>
          <p className="flex gap-1 items-center">
            <MdEmail />
            {user.email}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default OwnerDetails;
