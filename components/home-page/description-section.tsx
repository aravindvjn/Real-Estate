import React from "react";
import Container from "../ui/container";
import type { DescriptionCellProps } from "./types";
import { description } from "./options";

function DescriptionSection() {
  return (
    <Container center className="px-5 sm:px-10 py-[50px] sm:py-[100px] gap-8">
      <p id="whyshouldworkwithus" className="font-semibold md:text-[20px]">
        Why You Should Work With Us
      </p>
      <div className="grid grid-cols-3 gap-3">
        {description?.map((item, index) => (
          <SingleCell
            key={index}
            heading={item.heaing}
            subheading={item.subheading}
          >
            {item.icon}
          </SingleCell>
        ))}
      </div>
    </Container>
  );
}

const SingleCell = ({
  children,
  heading,
  subheading,
}: DescriptionCellProps) => {
  return (
    <Container center className="gap-2 sm:gap-3 text-center">
      {children}
      <p className="font-semibold text-[12px] md:text-[14px]">{heading}</p>
      <p className="text-[10px]">{subheading}</p>
    </Container>
  );
};
export default DescriptionSection;
