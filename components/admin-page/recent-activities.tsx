import timeAgo from "@/globals/helper/timeAgo";
import {
  getRecentActivities,
  ReturnType,
} from "@/lib/functions/getRecentActivities";
import Link from "next/link";
import React from "react";
import { IoIosHome } from "react-icons/io";
import { MdPersonAddAlt1, MdProductionQuantityLimits } from "react-icons/md";
import { NewPropertyProps, NewUserProps } from "./type";

const RecentActivity = async () => {

  //get recent activities from the server
  const recentActivity = await getRecentActivities();

  //if no recent activities, return failure.
  if (!recentActivity) {
    return <p className="text-red-500">Failed to Fetch.</p>;
  }

  //render recent activities conditionally
  const renderRecentActivities = () => {
    return recentActivity?.map((activity: ReturnType, index: number) => {

      const { type } = activity;

      //if type is user, render user component
      if (type === "user") {
        return (
          <NewUser
            id={activity.user_id}
            key={index}
            created_at={activity.created_at}
            name={`${activity.first_name} ${activity.last_name}`}
          />
        );
      }


      //if type is property, conditionally render properties with resp. to the operation.
      if (type === "property") {

        //for sold activity
        if (activity.sold) {
          return (
            <SoldProperty
              id={activity.id}
              key={index}
              title={activity.title}
              created_at={activity.created_at}
            />
          );

        } else {
          return (
            <NewProperty
              id={activity.id}
              key={index}
              title={activity.title}
              created_at={activity.created_at}
            />
          );
        }

      }
    });
  };


  return (
    <div className="p-3 sm:p-5 max-w-[730px] bg-white rounded-md shadow-md mt-4">
      <p className="font-bold text-[15px] pb-3 sm:text-lg md:text-xl">
        Recent Activities
      </p>
      <div className="flex flex-col gap-3">{renderRecentActivities()}</div>
    </div>
  );
};

export default RecentActivity;


const NewUser = ({
  name = "",
  created_at,
  id,
}:NewUserProps ) => {
  return (
    <div className="flex items-center gap-3">

      <div className="h-8 w-8 justify-center items-center flex rounded-full bg-blue-600">
        <MdPersonAddAlt1 color="white" />
      </div>

      <div>
        <Link href={`/users/${id}`} className="font-semibold">
          New User Registered: {name}
        </Link>
        <p className="text-[12px]">{timeAgo(created_at)}</p>
      </div>
      
    </div>
  );
};


//new property component
const NewProperty = ({
  title = "",
  created_at,
  id,
}:NewPropertyProps) => {
  return (
    <div className="flex items-center gap-3">

      <div className="h-8 w-8 justify-center items-center flex rounded-full bg-green-500">
        <IoIosHome color="white" />
      </div>

      <div>
        <Link
          href={`/properties/${id}`}
          className="font-semibold overflow-hidden"
        >
          New Property Added: {title}
        </Link>
        <p className="text-[12px]">{timeAgo(created_at)}</p>
      </div>

    </div>
  );
};


//sold property component
const SoldProperty = ({
  title = "",
  created_at,
  id,
}: NewPropertyProps) => {
  return (
    <div className="flex items-center gap-3">

      <div className="h-8 w-8 justify-center items-center flex rounded-full bg-orange-600">
        <MdProductionQuantityLimits color="white" />
      </div>

      <div>
        <Link
          href={`/properties/${id}`}
          className="font-semibold overflow-hidden"
        >
          New Property Sold: {title}
        </Link>
        <p className="text-[12px]">{timeAgo(created_at)}</p>
      </div>

    </div>
  );
};
