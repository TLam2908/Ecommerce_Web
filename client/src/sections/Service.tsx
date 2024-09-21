const pricingTiers = [
  {
    title: "Product Catalog & Search System",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Product listing",
      "Product details",
      "Search and filter system",
      "Compatibility check",
    ],
  },
  {
    title: "Customer Accounts & Service",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Customer registration",
      "Secure date encryption",
      "Review and rating",
      "Friendly user interface",
    ],
  },
  {
    title: "Logistics & Payment Gateway",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
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
    <section className="bg-white">
      <div className="">
        <h2 className="text-5xl text-center font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">Our Services</h2>
      </div>
    </section>
  );
};
