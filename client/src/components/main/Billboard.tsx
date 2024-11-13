'use client'
import { Billboard as BillboardType } from "../../../types";
import Slider from "react-slick";

interface BillboardProps {
  data: BillboardType[];
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const selectedBillboards = data.filter(
    (billboard) =>
      billboard.id.toString() === "2" || billboard.id.toString() === "3"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings}>
        {selectedBillboards.map((billboard: BillboardType) => (
          <div
            key={billboard.id}
            className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden bg-white"
          >
            <div
              className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
              style={{
                backgroundImage: `url(${billboard?.image_src})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
                  {billboard?.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Billboard;
