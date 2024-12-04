import { FaCheck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
const services = [
  {
    id: 1,
    title: "Products & Integration Search System",
    buttonText: "Sign up now",
    inverse: false,
    features: [
      "Product listing",
      "Product details",
      "Search and filter system",
      "Compatibility check",
    ],
  },
  {
    id: 2,
    title: "Customer Accounts & Service",
    monthlyPrice: 9,
    inverse: true,
    buttonText: "Sign up now",
    features: [
      "Customer registration",
      "Secure date encryption",
      "Review and rating",
      "Friendly user interface",
    ],
  },
  {
    id: 3,
    title: "Logistics & Payment Gateway",
    buttonText: "Sign up now",
    inverse: false,
    features: [
      "Shipping integration",
      "Payment gateway",
      "Order tracking",
      "Secure transactions",
    ],
  },
];

export const Service = () => {
  return (
    <section className="bg-white py-24" id="service">
      <div className="">
        <div className="flex justify-center">
          <div className="text-sm inline-flex border border-gray-400 px-3 py-1 rounded-lg tracking-tight text-black">
            Service we provide for you
          </div>
        </div>
        <h2 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
          Our Services
        </h2>
        <p className="text-center text-lg leading-[30px] tracking-tight text-[#010D3E] mt-5 max-w-[600px] mx-auto">
          We offer fast delivery, expert support, and a hassle-free return
          policy. Explore a wide range of genuine and aftermarket parts for all
          makes and models. Enjoy secure payments, order tracking, and
          customized solutions for workshops and car owners.
        </p>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-10 mt-20 px-32">
          {services.map((service) => (
            <div
              key={service.id}
              className={twMerge(
                "p-10 rounded-3xl border border-[#F1F1F1] shadow-[0_7px_14px_#EAEAEA]",
                service.inverse === true && "border-black bg-black text-white"
              )}
            >
              <h3
                className={twMerge(
                  "text-2xl font-bold text-black tracking-tighter leading-none",
                  service.inverse === true && "text-white"
                )}
              >
                {service.title}
              </h3>

              <button
                className={twMerge(
                  "bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight w-full mt-[30px]",
                  service.inverse === true && "bg-white text-black"
                )}
              >
                {service.buttonText}
              </button>
              <ul className="flex flex-col gap-5 mt-8">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex flex-row text-sm items-center gap-4"
                  >
                    <FaCheck
                      className={twMerge(
                        "text-black",
                        service.inverse === true && "text-white"
                      )}
                    />
                    <span
                      className={twMerge(
                        "text-black",
                        service.inverse === true && "text-white"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
