import React, { Suspense } from "react";
import { IoMenu } from "react-icons/io5";
import HeaderDropDown from "../home-page/header-dropdown";
import Link from "next/link";
import { headerLinks } from "./header-links";
import CheckingUser from "./checking-user";
import { VscAccount } from "react-icons/vsc";
import { app_name } from "@/globals/constants";
import { TbBrandNextjs } from "react-icons/tb";
const Header = ({ greenTheme }: { greenTheme?: boolean }) => {
  return (
    <div
      className={`p-4 flex justify-between rounded-full ${
        greenTheme ? "bg-green-1 text-white" : "bg-white "
      } bg-opacity-80 backdrop-blur-sm px-5 py-2`}
    >
      <div className="flex items-center gap-2">
        <IoMenu
          className="sm:hidden text-white"
          color={greenTheme ? "white" : "black"}
          size={22}
        />
        <Link href={"/"} className="font-semibold flex gap-[2px] items-center">
        <TbBrandNextjs size={18} />
          {app_name}
        </Link>
      </div>
      <HeaderDropDown options={headerLinks} />
      <div className="flex gap-2 sm:gap-3 items-center">
        <Suspense fallback={<VscAccount className="opacity-30" size={20} />}>
          <CheckingUser />
        </Suspense>
        <Link
          href={"/add-property"}
          className={`px-2 border rounded-full hover:bg-black/10 ${greenTheme ? "" : 'border-gray-500'}`}
        >
          Add Property
        </Link>
      </div>
    </div>
  );
};

export default Header;
