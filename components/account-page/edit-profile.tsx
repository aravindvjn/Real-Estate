import { getCurrentUser } from "@/lib/functions/getCurrentUser";
import React from "react";
import CreateUser from "../auth-page/create-user";

const EditProfile = async () => {
  const user = await getCurrentUser();
  return (
    <div className="bg-white-1">
      <p className="text-center translate-y-4 font-bold text-lg">Edit Profile</p>
      <CreateUser user={user} />
    </div>
  );
};

export default EditProfile;
