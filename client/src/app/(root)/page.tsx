import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/LogoTicker"; 
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Service } from "@/components/sections/Service";
import { Testimonials } from "@/components/sections/Testimonials";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/sections/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Service />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
