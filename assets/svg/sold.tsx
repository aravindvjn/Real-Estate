import React from "react";

type SoldIconProps = {
  size?: number;
  className?: string;
};

const SoldIcon: React.FC<SoldIconProps> = () => {
  return (
    <div
      style={{ border: "5px solid", backgroundColor: "#FFD700" }}
      className="w-fit border-white rounded-lg px-6 py-4 font-bold text-white"
    >
      <p className=" text-2xl sm:text-[50px] md:text-[50px] drop-shadow-md py-2">
        SOLD OUT
      </p>
    </div>
  );
};

export default SoldIcon;
