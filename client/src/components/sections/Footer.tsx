import logo from "@/assets/landingPage/logosaas.png";
import Image from "next/image";

import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";


export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div>
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:blur before:h-full before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <Image alt="logo" src={logo} height={40} className="relative"/>
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6 cursor-pointer">
          <a>About</a>
          <a>Services</a>
          <a>Features</a>
          <a>Products</a>
          <a>Help</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <FaTwitter size={24} color="white"/>
          <FaInstagram size={24} color="white"/>
          <FaYoutube size={24} color="white"/>
          <FaLinkedin size={24} color="white"/>
          <FaTiktok size={24} color="white"/>
          <FaPinterest size={24} color="white"/>
        </div>
        <p className="mt-6">&copy; 2024 AutoPart, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
};
