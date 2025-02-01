"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-xl md:text-3xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-sm md:text-lg text-gray-700">Please try again later.</p>
      <button
        onClick={() => router.refresh()}
        className="py-1 px-4 mt-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >Retry</button>
    </div>
  );
};

export default Error;
