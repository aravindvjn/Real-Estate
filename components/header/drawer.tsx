"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { headerLinks } from "./header-links";
import Link from "next/link";

const Drawer = ({ greenTheme }: { greenTheme: boolean }) => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [listOutIndex, setListOutIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const listOutHandler = (index: number) => {
    setListOutIndex((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <button
        onClick={() => setShowDrawer(true)}
        className="sm:hidden flex items-center gap-2 p-2  rounded-lg transition-all duration-200"
        aria-label="Open Menu"
      >
        <IoMenu color={greenTheme ? "white" : "black"} size={26} />
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {showDrawer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex bg-black/50 backdrop-blur-sm z-50"
                aria-hidden={!showDrawer}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="bg-white h-full w-3/4 max-w-[300px] lg:w-1/4 shadow-xl rounded-r-lg p-5 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Menu
                    </h2>
                    <button
                      onClick={() => setShowDrawer(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Close Menu"
                    >
                      <IoClose size={24} className="text-gray-700" />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {headerLinks.map((link, index) => (
                      <div key={index} className="border-b py-2">
                        <button
                          className="flex justify-between w-full text-gray-800 font-medium hover:text-blue-600 transition"
                          onClick={() => listOutHandler(index)}
                        >
                          {link.name}
                          <span className="text-sm">
                            {listOutIndex === index ? "▲" : "▼"}
                          </span>
                        </button>

                        {listOutIndex === index && (
                          <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pl-4 mt-2 space-y-1 text-sm text-gray-600"
                          >
                            {link.list.map((subLink, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  onClick={() => setShowDrawer(false)}
                                  href={subLink.href}
                                  className="block py-1 hover:text-blue-500"
                                >
                                  {subLink.text}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </div>
                    ))}
                  </nav>
                </motion.div>

                <motion.div
                  onClick={() => setShowDrawer(false)}
                  className="flex-grow"
                ></motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Drawer;
