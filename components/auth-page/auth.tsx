"use client";
import { app_name } from "@/globals/constants";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Container from "../ui/container";
import { SiNextdotjs } from "react-icons/si";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signWithGoogle = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/auth/create-user", redirect: true });
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col text-white">
      <Container center className="flex-col pb-5 gap-2">
        <SiNextdotjs size={50} />
        <p className="font-light text-3xl">{app_name}</p>
      </Container>
      <button
        onClick={signWithGoogle}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {isLoading ? "Signing In with Google..." : "Sign In with Google"}
      </button>
    </div>
  );
};

export default AuthPage;
