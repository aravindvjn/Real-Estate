"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { createPortal } from "react-dom";
import { HeaderLinkType } from "../header/header-links";

type DropDownProps = {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<number | undefined>>;
  id: number;
  option: HeaderLinkType;
};

const DropDown = ({
  children,
  setIsOpen,
  isOpen,
  id,
  option,
}: DropDownProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathName = usePathname();
  const toggleOpen = () => setIsOpen((prev) => (prev === id ? undefined : id));

  const getButtonPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
  };

  const greenTheme = pathName !== "/";

  return (
    <div
      onMouseEnter={() => setIsOpen(id)}
      onMouseLeave={() => setIsOpen(undefined)}
    >
      <button
        ref={buttonRef}
        className="flex gap-1 items-center"
        onClick={toggleOpen}
      >
        {option.name}
        {children}
      </button>

      {isOpen &&
        createPortal(
          <ul
            className={`fixed z-50 backdrop-blur-sm bg-opacity-80 min-w-[70px]  shadow-md rounded-b-lg overflow-hidden text-[12px] ${
              greenTheme ? "bg-green-1 text-white" : "bg-white"
            }`}
            style={{
              top: getButtonPosition().top,
              left: getButtonPosition().left,
            }}
          >
            {option?.list?.map((opt, index) => (
              <Link href={opt.href}>
                <li
                  key={index}
                  className={`px-5 py-2 border-t-[1px] border-opacity-10  cursor-pointer overflow-hidden ${
                    greenTheme ? "hover:bg-green-800" : "hover:bg-white"
                  }`}
                >
                  {opt.text}
                </li>
              </Link>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};

export default DropDown;
