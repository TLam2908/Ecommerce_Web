"use client";
import avatar1 from "@/assets/landingPage/avatar-1.png";
import avatar2 from "@/assets/landingPage/avatar-2.png";
import avatar3 from "@/assets/landingPage/avatar-3.png";
import avatar4 from "@/assets/landingPage/avatar-4.png";
import avatar5 from "@/assets/landingPage/avatar-5.png";
import avatar6 from "@/assets/landingPage/avatar-6.png";
import avatar7 from "@/assets/landingPage/avatar-7.png";
import avatar8 from "@/assets/landingPage/avatar-8.png";
import avatar9 from "@/assets/landingPage/avatar-9.png";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    text: "I bought a brake disc from this website, and the quality is truly outstanding! Installation was easy, and my car is performing much better now.",
    imageSrc: avatar1.src,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "The customer service is fantastic! I encountered an issue with my order, and they helped me resolve it quickly and efficiently.",
    imageSrc: avatar2.src,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "The prices here are very competitive compared to other stores. I saved a lot of money buying parts for my car.",
    imageSrc: avatar3.src,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "The detailed information about the products is very helpful, making it easy for me to choose the right parts for my vehicle.",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "The website is very user-friendly, and I could easily find the parts I needed with just a few clicks. Truly convenient!",
    imageSrc: avatar5.src,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "Shipping was incredibly fast! I received my order just two days after placing it. I am very impressed with the service.",
    imageSrc: avatar6.src,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "I am very satisfied with my shopping experience here! From product search to checkout, everything went smoothly.",
    imageSrc: avatar7.src,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "I needed technical support for installing a part, and the support team was very helpful. Truly commendable!",
    imageSrc: avatar8.src,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "I feel reassured knowing that the website has a money-back guarantee if the product does not meet my expectations.",
    imageSrc: avatar9.src,
    name: "Casey Harper",
    username: "@casey09",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonial: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      className="flex flex-col gap-6 pb-6"
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop'
      }}
    >
      {[
        ...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonial.map(({ name, imageSrc, text, username }) => (
              <div
                key={name}
                className={twMerge(
                  "p-10 rounded-3xl border border-[#F1F1F1] shadow-[0_7px_14px_#EAEAEA] max-w-sm w-full",
                  props.className
                )}
              >
                <div className="text-black">{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <Image
                    alt="avatar"
                    src={imageSrc}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col text-black">
                    <div className="font-semibold tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="tracking-tight leading-5">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        )),
      ]}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white py-24">
      <div>
        <div className="flex justify-center">
          <div className="text-sm inline-flex border border-gray-400 px-3 py-1 rounded-lg tracking-tight text-black">
            Testimonials
          </div>
        </div>
        <h2 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
          What our users say
        </h2>
        <p className="text-center text-lg leading-[30px] tracking-tight text-[#010D3E] mt-5 max-w-[600px] mx-auto">
          An auto parts website helps expand the market, reduce costs, enhance
          customer experience, and build brand effectively.
        </p>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonial={firstColumn} duration={15} />
          <TestimonialsColumn testimonial={secondColumn} duration={19} className="hidden lg:block" />
          <TestimonialsColumn testimonial={thirdColumn} duration={17} className="hidden md:block"/>
        </div>
      </div>
    </section>
  );
};
