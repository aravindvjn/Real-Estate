import React from "react";
import { IoMenu } from "react-icons/io5";
import HeaderDropDown from "../home-page/header-dropdown";
import AccountCircle from "./accountCircle";
import Link from "next/link";
import { headerLinks } from "./header-links";

const Header = ({ greenTheme }: { greenTheme?: boolean }) => {
  return (
    <div
      className={`p-3 flex justify-between rounded-full ${
        greenTheme ? "bg-green-1 text-white" : "bg-white "
      } bg-opacity-80 backdrop-blur-sm px-5 py-2`}
    >
      <div className="flex items-center gap-2">
        <IoMenu className="sm:hidden text-white" color="black" size={22} />
        <Link href={"/"} className="font-semibold">
          JustHome
        </Link>
      </div>
      <HeaderDropDown options={headerLinks} />
      <div className="flex gap-2 sm:gap-3 items-center">
        <p className="hidden md:flex">+6893788736</p>
        <AccountCircle />
        <Link
          href={"/add-property"}
          className="px-2 border rounded-full hover:bg-black/10"
        >
          Add Property
        </Link>
      </div>
    </div>
  );
};

export default Header;
