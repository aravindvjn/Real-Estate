import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { footerContent } from "./footer-links";

function Footer() {
  return (
    <div className="bg-[#1A1A1A] text-white px-10 py-6 m-1 rounded-lg font-light text-[10px]">
      <div className="flex items-center justify-between pb-10 ">
        <p>JustHome</p>
        <div className="flex gap-2 md:gap-4 items-center">
          <p>Follow Us</p>
          <button>
            <FaFacebook />
          </button>
          <button>
            <FaTwitter />
          </button>
          <button>
            <FaInstagram />
          </button>
          <button>
            <FaLinkedin />
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="flex gap-8 justify-between">
          <div className="flex flex-col gap-2 items-start  w-1/5">
            <button className="opacity-60">Subscribe</button>
            <div className="flex gap-10 items-center justify-between">
              <p>Your email</p>
              <button className="flex items-center gap-1 bg-[rgb(62,62,62)] px-3 py-1 rounded-full">
                Send <IoArrowForward />
              </button>
            </div>
          </div>
          {footerContent.map((content, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="opacity-60 text-[12px]">{content.heading}</h3>
                <ul className="flex flex-col gap-1.5">
                  {content.links.map((link, linkIndex) =>
                    link?.href ? (
                      <li key={linkIndex}>{link.label}</li>
                    ) : (
                      <li key={linkIndex}>{link.label}</li>
                    )
                  )}
                </ul>
              </div>
            );
          })}
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
