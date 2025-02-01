import React from "react";
import Container from "./container";

const CenterHeader = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <Container center className="flex-col text-center p-5 gap-2">
      <p className="max-w-[300px] font-bold text-xl sm:text-2xl md:text-3xl" >{heading}</p>
      <p className="max-w-[400px] text-[12px] sm:text-[14px]">{subheading}</p>
    </Container>
  );
};

export default CenterHeader;
