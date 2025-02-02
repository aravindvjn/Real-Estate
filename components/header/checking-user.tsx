"use client";

import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/functions/getCurrentUser";
import AccountCircle from "./accountCircle";

const CheckingUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = (await getCurrentUser(true)) || {};
        setUser(userData);
        console.log("User fetched successfully:", userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    getUser();
  }, []);

  return <AccountCircle user={user!} />;
};

export default CheckingUser;
