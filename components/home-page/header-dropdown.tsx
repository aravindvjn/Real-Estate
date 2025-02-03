"use client";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import DropDown from "../ui/drop-down";
import { HeaderLinkType } from "../header/header-links";

export type HeaderDropDownProps = {
  options: HeaderLinkType[];
};
function HeaderDropDown({ options }: HeaderDropDownProps) {
  
  const [open, setOpen] = useState<number | undefined>();

  return (
    <div className="sm:flex gap-2 md:gap-3 lg:gap-5 hidden">
      {options?.map((option, index) => (
        <DropDown
          id={index}
          isOpen={open === index}
          setIsOpen={setOpen}
          key={index}
          option={option}
        >
          <IoMdArrowDropdown />
        </DropDown>
      ))}
    </div>
  );
}

export default HeaderDropDown;
