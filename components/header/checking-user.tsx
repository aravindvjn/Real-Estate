"use server";
import React from "react";
import AccountCircle from "./accountCircle";
import { getCurrentUser } from "@/lib/functions/getCurrentUser";

const CheckingUser = async() => {
  const user = await getCurrentUser(true)
  return <AccountCircle user={user} />;
};

export default CheckingUser;
