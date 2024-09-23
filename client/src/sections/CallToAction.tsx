import { GoArrowRight } from "react-icons/go";

export const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#D2DCFF] py-24">
      <div className="">
        <div></div>
        <h2 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
          Sign up to shopping now!
        </h2>
        <p className="text-center text-lg leading-[30px] tracking-tight text-[#010D3E] mt-5 max-w-[600px] mx-auto">
          Sign up now to unlock exclusive access to our wide selection of
          high-quality auto parts and enjoy a seamless shopping experience
          tailored just for you!
        </p>
        <div className="flex mt-10 justify-center gap-6">
          <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">Sign up now</button>
          <button className="bg-black bg-transparent">
              <span className="text-black">Learn more</span>
              <GoArrowRight color="black" size={18} className="inline-flex justify-center items-center ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
