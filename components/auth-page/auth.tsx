"use client";
import { app_name } from "@/globals/constants";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Container from "../ui/container";
import { SiNextdotjs } from "react-icons/si";

const AuthPage = () => {

  //loading state to show loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //sign in with google operation
  const signWithGoogle = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/auth/create-user", redirect: true });
  };

  return (
    <div className="flex items-center bg-white  justify-center p-5 flex-col rounded-md m-5 shadow-md text-[12px] sm:text-[14px] text-black">

      <Container center className="flex-col gap-2">
        <SiNextdotjs size={50} />
        <p className="font-light text-xl sm:text-2xl">Welcome to {app_name}</p>
      </Container>

      <p className="pb-4 ">Sign in to continue</p>

      <button
        onClick={signWithGoogle}
        className="rounded border  border-black hover:bg-gray-200 px-4 py-2"
      >
        {isLoading ? "Continuing with Google..." : "Continue with Google"}
      </button>
      
    </div>
  );
};

export default AuthPage;
