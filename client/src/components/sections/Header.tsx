"use client";
import Image from "next/image";
import { Link } from "react-scroll";

import Logo from "@/assets/landingPage/logosaas.png";
import { IoMenu } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";

import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3 cursor-default">
        <p className="text-white/60 hidden md:block">
          Ultilize your shopping experience
        </p>
        <div className="inline-flex justify-center gap-1 items-center">
          <p
            onClick={() => {
              router.push("/main");
            }}
          >
            Click here to shopping!
          </p>
          <GoArrowRight
            color="white"
            size={18}
            className="inline-flex justify-center items-center"
          />
        </div>
      </div>
      <div className="py-5 px-10">
        <div className="">
          <div className="flex justify-between items-center">
            <Image src={Logo} alt="logo" width={40} height={40} />
            {/* den md thi hidden */}
            <IoMenu size={32} color="black" className="md:hidden" />
            <nav className="text-black/60 hidden md:flex gap-6 items-center text-sm cursor-pointer">
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Home
              </Link>
              <Link
                to="product"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Product
              </Link>
              <Link
                to="service"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Service
              </Link>
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                About us
              </Link>
              <button
                className="bg-black text-white px-4 py-2 font-medium inline-flex rounded-lg items-center justify-center tracking-tight"
                onClick={() => router.push("/auth/login")}
              >
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
