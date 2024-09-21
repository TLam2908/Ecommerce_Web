import Image, { StaticImageData } from "next/image";

type FeaturedProductProps = {
    name: string;
    image: StaticImageData;
    description: string;
};


export const FeaturedProduct = ({ name, image, description }: FeaturedProductProps): JSX.Element => {

    return (
        <div className="flex flex-col gap-4">
            <div className="cursor-pointer group">
                <div className="flex flex-col">
                    <div className="aspect-square overflow-hidden relative rounded-xl">
                        <Image src={image} alt="brake-disc" width={500} height={500} className="border-2 border-black w-[250px] h-[250px] transition group-hover:scale-110" />
                    </div>
                    <div className="">
                        <div className="font-bold text-lg text-black">{name}</div>
                        <div className="text-gray-500">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

