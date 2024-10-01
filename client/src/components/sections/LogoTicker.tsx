"use client";
import bosch from "@/assets/landingPage/bosch.png";
import toyota from "@/assets/landingPage/toyota.png";
import mercedes from "@/assets/landingPage/mercedes.png";
import lexus from "@/assets/landingPage/lexus.png";
import vinfast from "@/assets/landingPage/vinfast.png";
import rollsRoyce from "@/assets/landingPage/rolls-royce.png";
import lamborghini from "@/assets/landingPage/lamborghini.png";
import bugatti from "@/assets/landingPage/bugatti.png";
import ford from "@/assets/landingPage/ford.png";
import Image from "next/image";

import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <div className="py-4 md:py-8 bg-white">
      <div className="container">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none items-center pr-14"
            animate={{
              translateX: "-100%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: 'loop'
            }}
          >
            <Image alt="mercedes" src={mercedes} className="h-8 w-auto" />
            <Image alt="bosch" src={bosch} className="h-14 w-auto" />
            <Image alt="toyota" src={toyota} className="h-8 w-auto" />
            <Image alt="lexus" src={lexus} className="h-8 w-auto" />
            <Image alt="vinfast" src={vinfast} className="h-8 w-auto" />
            <Image alt="rollsRoyce" src={rollsRoyce} className="h-8 w-auto" />
            <Image
              alt="lamborghini"
              src={lamborghini}
              className="h-10 w-auto"
            />
            <Image alt="bugatti" src={bugatti} className="h-10 w-auto" />
            <Image alt="ford" src={ford} className="h-12 w-auto" />

            {/* Second */}
            <Image alt="mercedes" src={mercedes} className="h-8 w-auto" />
            <Image alt="bosch" src={bosch} className="h-14 w-auto" />
            <Image alt="toyota" src={toyota} className="h-8 w-auto" />
            <Image alt="lexus" src={lexus} className="h-8 w-auto" />
            <Image alt="vinfast" src={vinfast} className="h-8 w-auto" />
            <Image alt="rollsRoyce" src={rollsRoyce} className="h-8 w-auto" />
            <Image
              alt="lamborghini"
              src={lamborghini}
              className="h-10 w-auto"
            />
            <Image alt="bugatti" src={bugatti} className="h-10 w-auto" />
            <Image alt="ford" src={ford} className="h-12 w-auto" />

          </motion.div>
        </div>
      </div>
    </div>
  );
};
