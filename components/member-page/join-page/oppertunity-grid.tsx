import React from "react";
import { options } from "./options";
import OpportunityCell from "./grid-cell";

const OpportunityGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7 p-3 sm:p-5 md:px-10">
      {options.map((option, index) => (
        <OpportunityCell button_text="Apply Now" key={index} {...option} />
      ))}
    </div>
  );
};

export default OpportunityGrid;
