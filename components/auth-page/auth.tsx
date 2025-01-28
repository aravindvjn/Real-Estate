"use client";
import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";

const AuthPage = () => {
  const signWithGoogle = () => {
    signIn("google", { callbackUrl: "/auth/create-user", redirect: true });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={signWithGoogle}
        className="rounded bg-green-1 px-4 py-2 text-white"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default AuthPage;
