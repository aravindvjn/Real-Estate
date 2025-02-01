import React from "react";

const Heading = ({ text }: { text: string }) => {
  return <p className="text-lg md:text-xl font-bold my-2">{text}</p>;
};

export default Heading;
