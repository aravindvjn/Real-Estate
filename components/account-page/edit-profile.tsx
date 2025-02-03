import { getCurrentUser } from "@/lib/functions/getCurrentUser";
import React from "react";
import CreateUser from "../auth-page/create-user";

const EditProfile = async () => {
  const user = await getCurrentUser();
  return (
    <div className="bg-white-1">
      <CreateUser text="Edit your account" user={user} />
    </div>
  );
};

export default EditProfile;
