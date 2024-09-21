import { GoArrowRight } from "react-icons/go";
import cogImage from "@/assets/landingPage/cog.png";
import cylinderImage from "@/assets/landingPage/cylinder.png";
import noodleImage from "@/assets/landingPage/noodle.png";

import Image from "next/image";

export const Hero = () => {
  return (
    <section className="pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
      <div className="p-10 md:flex items-center">
        <div className="md:w-[478px] xl:w-[740px] lg:w-[450px]">
          <div className="text-sm inline-flex border border-gray-400 px-3 py-1 rounded-lg tracking-tight text-black">
            Get the best autoparts
          </div>
          <h1 className="xl:text-7xl lg:text-6xl text-5xl font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">For hundreds of vehicle</h1>
          <p className="xl:text-xl lg:text-lg md:text-md text-[#010D3E] tracking-tight mt-6">
            Discover a comprehensive selection of high-quality auto parts and
            accessories, designed to keep your vehicle running smoothly and
            efficiently, with easy navigation and fast shipping for all your
            repair and upgrade needs
          </p>
          <div className="flex gap-4 items-center mt-[30px]">
            <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">Log in</button>
            <button className="bg-black bg-transparent">
              <span className="text-black">Shop now</span>
              <GoArrowRight color="black" size={18} className="inline-flex justify-center items-center ml-1" />
            </button>
          </div>
        </div>
        <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
          <Image alt="cog" src={cogImage} className="md:absolute md:h-full md:w-auto md:max-w-none md:left-12 lg:left-0"/>
          <Image alt="cylinder" src={cylinderImage} width={220} height={220} className="hidden md:block lg:-left-20 lg:-top-16 absolute -top-8 -left-10"/>
          <Image alt="noodle" src={noodleImage} width={220} className="hidden lg:block absolute top-[524px] left-[520px] rotate-[30deg]"/>
        </div>
      </div>
    </section>
  );
};
