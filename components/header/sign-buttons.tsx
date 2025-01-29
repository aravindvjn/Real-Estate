"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SignButtons = () => {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push("/auth")}
        className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
      >
        Sign Up
      </button>
      <button
        onClick={() => router.push("/auth")}
        className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
      >
        Sign In
      </button>
    </>
  );
};

export default SignButtons;
