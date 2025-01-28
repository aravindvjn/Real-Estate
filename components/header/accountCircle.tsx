"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";

function AccountCircle({ greenTheme }: { greenTheme?: boolean }) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const session = useSession();

  const router = useRouter();
  const toggleMenu = () => {
    if (greenTheme) {
      router.push("/auth");
    }
    setShowMenu((prev) => !prev);
  };

  const user = session.data?.user;
  return (
    <div className="relative flex items-center">
      {showMenu && (
        <div className="absolute top-10 right-0 rounded-md shadow-lg p-5 bg-white flex flex-col gap-5">
          {user?.email ? <><button
            onClick={() => signOut()}
            className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
          >Sign Out</button></> : <><button
            onClick={() => router.push("/auth")}
            className=" px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("/auth")}
            className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
          >
            Sign In
          </button></>}
        </div>
      )}
      <button onClick={toggleMenu}>
        {user?.image ? (
          <Image className="h-[20px] w-[20px] rounded-full" src={user?.image} width={30} height={30} alt="profile-pic" />
        ) : (
          <VscAccount size={20} />
        )}
      </button>
    </div>
  );
}

export default AccountCircle;
