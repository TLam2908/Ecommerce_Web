
import { FeaturedProduct } from "@/components/landingPage/FeaturedProduct"
import wheelHub from "@/assets/landingPage/wheel-hub-bearing-assembly.png"
import ignitionCoils from "@/assets/landingPage/ignition-coils.png"
import brakeDiscs from "@/assets/landingPage/brake-discs.png"
import cylinderHead from "@/assets/landingPage/cylinder-head.png"
import waterPump from "@/assets/landingPage/water-pump.png"
import massAir from "@/assets/landingPage/mass-air-flow.jpg"

const featuredProducts = [
  {
    name: "Wheel Hub Bearing Assembly",
    image: wheelHub,
    description: "Rear axle hub and bearing assembly",
  },
  {
    name: "Ignition Coil",
    image: ignitionCoils,
    description: "Ignition coil used to provide the spark for the engine",
  },
  {
    name: "Brake disc",
    image: brakeDiscs,
    description: "Front brake disc for braking system",
  },
  {
    name: "Cylinder Head",
    image: cylinderHead,
    description: "Cylinder head assembly for engine",
  },
  {
    name: "Water Pump",
    image: waterPump,
    description: "Engine water pump for cooling system",
  },
  {
    name: "Mass Air Flow Sensor",
    image: massAir,
    description: "Mass air flow sensor for engine",
  },

]

export const ProductShowcase = () => {
  return (
    <section className="py-24 bg-white">
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
                max-w-[1300px] mx-auto cursor-pointer"
        >
          {featuredProducts.map((product) => (
            <FeaturedProduct key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
