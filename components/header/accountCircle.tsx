"use client";
import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";

function AccountCircle() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <div className="relative">
      {showMenu && (
        <div className="absolute top-10 right-0  rounded-md shadow-lg p-5 bg-white flex flex-col gap-5">
          <button className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white">
            Sign Up
          </button>
          <button className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white">
            Sign In
          </button>
        </div>
      )}
      <button
        onClick={toggleMenu}
      >
        <VscAccount size={18} />
      </button>
    </div>
  );
}

export default AccountCircle;
