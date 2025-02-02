import React from "react";
import { BasicUserDataType } from "./type";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import Container from "../ui/container";

const UserPopDetails = ({
  email,
  first_name,
  last_name,
  profile_picture_url,
  isAdmin,
}: BasicUserDataType) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Link href={"/account"}>
        {isAdmin ? (
          <Container center className="rounded-full h-[100px] w-[100px] bg-yellow-500">
            <FaCrown size={60} />
          </Container>
        ) : (
          <Image
            className="rounded-full object-cover h-[100px] w-[100px]"
            src={profile_picture_url}
            alt={first_name}
            height={100}
            width={100}
          />
        )}
      </Link>
      <p className="font-semibold text-sm">
        {first_name} {last_name}
      </p>
      <Link href={'/admin'} className="text-blue-600 underline">{isAdmin && "Go to Admin"}</Link>
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
