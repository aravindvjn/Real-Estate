import timeAgo from "@/globals/helper/timeAgo";
import {
  getRecentActivities,
  ReturnType,
} from "@/lib/functions/getRecentActivities";
import Link from "next/link";
import React from "react";
import { IoIosHome } from "react-icons/io";
import { MdPersonAddAlt1, MdProductionQuantityLimits } from "react-icons/md";
const RecentActivity = async () => {
  const recentActivity = await getRecentActivities();
  if (!recentActivity) {
    return <p className="text-red-500">Failed to Fetch.</p>;
  }
  return (
    <div className="p-3 sm:p-5 max-w-[730px] bg-white rounded-md shadow-md mt-4">
      <p className="font-bold text-[15px] pb-3 sm:text-lg md:text-xl">
        Recent Activities
      </p>
      <div className="flex flex-col gap-3">
        {recentActivity?.map((activity: ReturnType, index: number) => {
          const { type } = activity;
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
          if (type === "property") {
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
        })}
      </div>
    </div>
  );
};

export default RecentActivity;

const NewUser = ({
  name = "",
  created_at,
  id,
}: {
  name: string;
  created_at: string;
  id: string;
}) => {
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

const NewProperty = ({
  title = "",
  created_at,
  id,
}: {
  title: string;
  created_at: string;
  id: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 justify-center items-center flex rounded-full bg-green-500">
        <IoIosHome color="white" />
      </div>
      <div>
        <Link href={`/properties/${id}`} className="font-semibold overflow-hidden">
          New Property Added: {title} 
        </Link>
        <p className="text-[12px]">{timeAgo(created_at)}</p>
      </div>
    </div>
  );
};

const SoldProperty = ({
  title = "",
  created_at,
  id,
}: {
  title: string;
  created_at: string;
  id: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 justify-center items-center flex rounded-full bg-orange-600">
        <MdProductionQuantityLimits color="white" />
      </div>
      <div>
        <Link href={`/properties/${id}`} className="font-semibold overflow-hidden" >
          New Property Sold: {title}
        </Link>
        <p className="text-[12px]">{timeAgo(created_at)}</p>
      </div>
    </div>
  );
};
