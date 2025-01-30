import React from "react";
import { GoDotFill } from "react-icons/go";

const FeatureSection = ({ features }: { features: string[] }) => {
  return (
    <div>
      <p className="text-lg md:text-xl font-bold my-2">Features</p>
      <ul className="flex flex-col text-gray-600 gap-1">
        {features.map((feature, index) => (
          <li key={index} className=" md:mt-2 flex items-center gap-2">
            <GoDotFill size={12} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureSection;
