"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { VscAccount } from "react-icons/vsc";
import { BasicUserDataType } from "./type";
import UserPopDetails from "./user-pop-detail";
import SignButtons from "./sign-buttons";
import { useRouter } from "next/navigation";
import Container from "../ui/container";
import { FaCrown } from "react-icons/fa";

function AccountCircle({ user }: { user: BasicUserDataType }) {

  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //toggle menu when there is a click
  const toggleMenu = () => setShowMenu((prev) => !prev);

  //get button position to calculate the position of the menu
  const getButtonPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 90,
    };
  };

  //to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    const handleMouseLeave = () => setShowMenu(false);

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      menuRef.current?.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      menuRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showMenu]);

  //Conditionally rendering the profile
  const profile = user?.profile_picture_url ? (
    user?.isAdmin ? (
      <Container
        center
        className="rounded-full h-[23px] w-[23px] bg-yellow-500"
      >
        <FaCrown size={15} />
      </Container>
    ) : (
      <Image
        onDoubleClick={() => router.push("/account")}
        className="h-[23px] w-[23px] rounded-full object-cover"
        src={user?.profile_picture_url}
        width={30}
        height={30}
        alt="profile-pic"
      />
    )
  ) : (
    <VscAccount size={20} />
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex items-center"
      >
        {profile}
      </button>

      {showMenu &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-50 rounded-md shadow-lg p-3 bg-white flex flex-col gap-5 text-[12px]"
            style={{
              top: getButtonPosition().top,
              left: getButtonPosition().left,
            }}
          >
            {user?.email ? <UserPopDetails {...user} /> : <SignButtons />}
          </div>,
          document.body
        )}
    </>
  );
}

export default AccountCircle;
