"use client";

import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/functions/getCurrentUser";
import AccountCircle from "./accountCircle";

const CheckingUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    const getUser = async () => {
      try {
        const userData = (await getCurrentUser(true)) || {};
        setUser(userData);
        console.log("User fetched successfully:", userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }

      setIsLoading(false);
    };
    getUser();
  }, []);

  if (isLoading) {
    return <div className="h-[23px] w-[23px] rounded-full animate-pulse bg-gray-300"></div>;
  }
  return <AccountCircle user={user!} />;
};

export default CheckingUser;
