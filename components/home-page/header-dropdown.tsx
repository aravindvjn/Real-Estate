import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export type HeaderDropDownProps = {
  options: { label: string; dropdown?: string[] }[];
};
function HeaderDropDown({ options }: HeaderDropDownProps) {
  return (
    <ul className="sm:flex gap-2 md:gap-3 lg:gap-5 hidden">
      {options?.map((option, index) => (
        <li key={index}>{option.label}</li>
      ))}
    </ul>
  );
}

export default HeaderDropDown;
