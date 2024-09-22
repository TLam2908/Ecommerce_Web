import Image, { StaticImageData } from "next/image";

type FeaturedProductProps = {
  name: string;
  image: StaticImageData;
  description: string;
};

export const FeaturedProduct = ({
  name,
  image,
  description,
}: FeaturedProductProps): JSX.Element => {
  return (
    <div className="p-10 rounded-3xl border border-[#F1F1F1] shadow-[0_7px_14px_#EAEAEA]">
      <div className="flex flex-col gap-4 group">
        <Image alt="product" src={image} className="transition group-hover:scale-110 w-[250px] h-[190px]"/>
        <div>
            <h3 className="text-lg font-bold text-black">{name}</h3>
            <p className="text-sm text-black">{description}</p>
        </div>
      </div>
    </div>
  );
};
