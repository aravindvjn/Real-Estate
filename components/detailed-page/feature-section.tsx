import React from "react";
import { GoDotFill } from "react-icons/go";
import Heading from "../ui/heading";

const FeatureSection = ({ features }: { features: string[] }) => {
  return (
    <div>
      <Heading text="Features"/>
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
