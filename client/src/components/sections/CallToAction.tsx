"use client";
import { GoArrowRight } from "react-icons/go";
import starImage from "@/assets/landingPage/star.png";
import springImage from "@/assets/landingPage/spring.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="">
        <div className="relative">
          <h2 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            Sign up to shopping now!
          </h2>
          <p className="text-center text-lg leading-[30px] tracking-tight text-[#010D3E] mt-5 max-w-[600px] mx-auto">
            Sign up now to unlock exclusive access to our wide selection of
            high-quality auto parts and enjoy a seamless shopping experience
            tailored just for you!
          </p>
          <motion.img
            alt="star"
            src={starImage.src}
            width={360}
            className="absolute -top-[137px] hidden 2xl:block"
            style={{
              translateY,
            }}
          />
          <motion.img
            alt="spring"
            src={springImage.src}
            width={360}
            className="absolute right-[50px] -top-[150px] hidden 2xl:block"
            style={{
              translateY,
            }}
          />
        </div>
        <div className="flex mt-10 justify-center gap-6">
          <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
            Sign up now
          </button>
          <button className="bg-black bg-transparent">
            <span className="text-black">Learn more</span>
            <GoArrowRight
              color="black"
              size={18}
              className="inline-flex justify-center items-center ml-2"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
