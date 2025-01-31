"use client";

import React, { useEffect, useState } from "react";
import AccountCircle from "./AccountCircle";
import { getCurrentUser } from "@/lib/functions/getCurrentUser";

const CheckingUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = (await getCurrentUser(true)) || {};
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    getUser();
  }, []);

  return <AccountCircle user={user!} />;
};

export default CheckingUser;
