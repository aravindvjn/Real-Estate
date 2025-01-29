"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { VscAccount } from "react-icons/vsc";

function AccountCircle() {
  const [showMenu, setShowMenu] = useState(false);
  const session = useSession();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle menu visibility
  const toggleMenu = () => setShowMenu((prev) => !prev);

  // Get button position for menu placement
  const getButtonPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY, 
      left: rect.left + window.scrollX - 90, 
    };
  };


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

  const user = session.data?.user;

  return (
    <>
      <button ref={buttonRef} onClick={toggleMenu} className="flex items-center">
        {user?.image ? (
          <Image
            className="h-[20px] w-[20px] rounded-full"
            src={user?.image}
            width={30}
            height={30}
            alt="profile-pic"
          />
        ) : (
          <VscAccount size={20} />
        )}
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
            {user?.email ? (
              <button
                onClick={() => signOut()}
                className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/auth")}
                  className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => router.push("/auth")}
                  className="px-2 py-1 border w-[80px] bg-white-1 rounded hover:bg-white"
                >
                  Sign In
                </button>
              </>
            )}
          </div>,
          document.body
        )}
    </>
  );
}

export default AccountCircle;
