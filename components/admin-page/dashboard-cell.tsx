import React from "react";

const DashboardCell = ({
  count,
  text,
  children,
}: {
  count: number;
  text: string;
  children: React.ReactNode;
}) => {
  
  return (
    <div className="flex p-5  items-center bg-white shadow-md rounded-md gap-3 sm:gap-5 w-[230px]">
      {children}
      <div className="flex flex-col text-center justify-center items-center">
        <p className="text-lg font-bold">{count}</p>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default DashboardCell;
