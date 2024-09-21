import Image from "next/image";

import Logo from "../assets/landingPage/logosaas.png";
import { IoMenu } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3 cursor-default">
        <p className="text-white/60 hidden md:block">Ultilize your shopping experience</p>
        <div className="inline-flex justify-center gap-1 items-center">
          <p>Click here to shopping!</p>
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
            <nav className="text-black/60 hidden md:flex gap-6 items-center text-sm">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Service</a>
              <a href="#">Product</a>
              <button className="bg-black text-white px-4 py-2 font-medium inline-flex rounded-lg items-center justify-center tracking-tight">Sign In</button>
            </nav>
          </div>
        </div>  
      </div>
    </header>
  );
};
