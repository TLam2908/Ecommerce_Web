import { FeaturedProduct } from "@/components/FeaturedProduct";
import wheelHub from "@/assets/landingPage/wheel-hub-bearing-assembly.png";
import ignitionCoils from "@/assets/landingPage/ignition-coils.png";
import brakeDiscs from "@/assets/landingPage/brake-discs.png";
import cylinderHead from "@/assets/landingPage/cylinder-head.png";
import massAir from "@/assets/landingPage/mass-air-flow.jpg";
import headLight from "@/assets/landingPage/headlight.jpg"

const featuredProducts = [
  {
    name: "Tranmission and Chassis",
    image: wheelHub,
    description: "Transmission and Chassis encompasses the components responsible for delivering power from the engine to the wheels",
  },
  {
    name: "Electrical",
    image: ignitionCoils,
    description: "The Electrical in vehicles covers all the components and systems powered by electricity, including essential functions.",
  },
  {
    name: "Brake system",
    image: brakeDiscs,
    description: "The Brake System in a vehicle is crucial for ensuring safe stopping and deceleration. It consists of several key components that work together to slow down or stop the vehicle ",
  },
  {
    name: "Engine",
    image: cylinderHead,
    description: "Engine parts generally refers to all parts and systems directly involved in generating power for a vehicle",
  },
  {
    name: "Body parts",
    image: headLight,
    description: "The Body Part in the automotive sector refers to all the external and structural components of a vehicle",
  },
  {
    name: "Fuel system",
    image: massAir,
    description: "Fuel system includes components and systems responsible for delivering fuel to the engine.",
  },
];

export const ProductShowcase = () => {
  return (
    <section className="py-24 bg-white overflow-x-clip">
      <div className="">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-center">
            <div className="text-sm inline-flex border border-gray-400 px-3 py-1 rounded-lg tracking-tight text-black">
              A smarter way to find auto parts
            </div>
          </div>
          <h2 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            Our Products
          </h2>
          <p className="text-center text-lg leading-[30px] tracking-tight text-[#010D3E] mt-5">
            We provide high-quality auto parts at competitive prices, ensuring
            to meet all your vehicle repair and maintenance needs. With a wide
            range of products from reputable brands, we are committed to
            offering you optimal solutions and dedicated service.
          </p>
        </div>
        <div className="flex">
          <div
            className="grid
                grid-cols-1
                sm:grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                2xl:grid-cols-3
                gap-10
                mt-10
                px-20
                max-w-[1300px] mx-auto cursor-pointer justify-center"
          >
            {featuredProducts.map((product) => (
              <FeaturedProduct key={product.name} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
