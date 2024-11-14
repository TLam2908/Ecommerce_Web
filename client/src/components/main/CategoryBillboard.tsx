import { Billboard as BillboardType } from "../../../types";

interface BillboardProps {
  data: BillboardType;
}

const CategoryBillboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div
      key={data.id}
      className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden bg-white"
    >
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{
          backgroundImage: `url(${data?.image_src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
            {data?.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBillboard;
