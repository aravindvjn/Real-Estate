import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { footerContent } from "./footer-links";
import Link from "next/link";
import { BsApple } from "react-icons/bs";
import { BiLogoPlayStore } from "react-icons/bi";

function Footer() {
  return (
    <div className="bg-[#1A1A1A] text-white px-10 py-6 m-1 rounded-lg font-light text-[10px] lg:text-[12px]">
      <div className="flex items-center justify-between pb-10 ">
        <p>JustHome</p>
        <div className="flex gap-2 md:gap-4 items-center">
          <p>Follow Us</p>
          <Link href={'#'}>
            <FaFacebook />
          </Link>
          <Link href={'#'}>
            <FaTwitter />
          </Link>
          <Link href={'https://instagram.com/6windh'}>
            <FaInstagram />
          </Link>
          <Link href={'#'}>
            <FaLinkedin />
          </Link>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-8 justify-between">
          <div className="flex flex-col gap-2 items-start  w-1/5">
            <button className="opacity-60">Subscribe</button>
            <div className="flex gap-10 items-center justify-between">
              <p>Your email</p>
              <button className="flex items-center gap-1 bg-[rgb(62,62,62)] px-3 py-1 rounded-full">
                Send <IoArrowForward />
              </button>
            </div>
          </div>
          <div className="sm:hidden"></div>
          {footerContent.map((content, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="opacity-60 text-[12px]">{content.heading}</h3>
                <ul className="flex flex-col gap-1.5">
                  {content.links.map((link, linkIndex) =>
                    link?.href ? (
                      <li key={linkIndex}>
                        <Link href={link?.href}>{link.label}</Link>
                      </li>
                    ) : (
                      <li key={linkIndex}>{link.label}</li>
                    )
                  )}
                </ul>
              </div>
            );
          })}
          <div className="flex flex-col gap-2 text-[10px]">
            <h3 className="opacity-60 text-[12px]">Get the app</h3>
            <Link href="/">
              <button className="px-2 py-1 rounded flex items-center gap-2 bg-[#3c3c3c] text-white w-[110px]">
                <BsApple size={14} />
                <div className="border-l pl-2">
                  <p className="text-[8px]">Download on the </p>
                  <p>App Store</p>
                </div>
              </button>
            </Link>
            <Link href="/">
              <button className="px-2 py-1 rounded flex gap-2 bg-[#3c3c3c] w-[110px] items-center">
                <BiLogoPlayStore size={14} />
                <div className="border-l pl-2">
                  <p className="text-[8px]">Get in on </p>
                  <p>Google Play</p>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <hr className="my-5 opacity-20" />
        <p className="text-center">
          &copy; {new Date().getFullYear()} JustHome. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
