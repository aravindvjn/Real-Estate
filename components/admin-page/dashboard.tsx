import React from "react";
import DashboardCell from "./dashboard-cell";
import { IoIosHome, IoIosPeople } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { getDashboardData } from "@/lib/functions/getDashboardData";

const Dashboard = async () => {
  const dashboardData = await getDashboardData();

  const data = [
    {
      count: dashboardData.totalUsers,
      text: "Total Users",
      icon: <IoIosPeople size={30} color="white" />,
    },
    {
      count: dashboardData.totalProperties,
      text: "Total Properties",
      icon: <IoIosHome size={26} color="white" />,
    },
    {
      count: dashboardData.soldProperties,
      text: "Sold Properties",
      icon: <MdProductionQuantityLimits size={25} color="white" />,
    },
    
  ];
  return (
    <div>
      <p className="font-bold text-lg sm:text-xl md:text-2xl">Dashboard</p>
      <div className="flex mt-3 flex-col sm:flex-row gap-3 md:gap-5 justify-start">
        {data.map((item, index) => (
          <DashboardCell key={index} count={item.count} text={item.text}>
            <div
              className={`flex justify-center items-center h-12 w-12  rounded-full ${color(
                index
              )}`}
            >
              {item.icon}
            </div>
          </DashboardCell>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

const color = (index: number) => {
  return index === 0
    ? "bg-blue-500"
    : index === 1
    ? "bg-green-500"
    : "bg-orange-600";
};
