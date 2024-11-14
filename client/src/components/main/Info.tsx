import { ShoppingCart } from "lucide-react";
import { Product } from "../../../types";
import Currency from "../ui/currency";
import HomeButton from "./HomeButton";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {

    let stock = ""
    if (data.quantity.toString() === "0") {
        stock = "Out of Stock"
    } else {
        stock = "In Stock"
    }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black text-lg">Description:</h3>
        <div className="text-lg">{data.description}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black text-lg">Category:</h3>
        <div className="text-lg">{data.Category.name}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black text-lg">Manufacturer:</h3>
        <div className="text-lg">{data.Manufacturer.name}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black text-lg">OEM Number:</h3>
        <div className="text-lg">{data.oem_number}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black text-lg">{stock}:</h3>
        <div className="text-lg">{data.quantity}</div>
      </div>
      <hr className="my-4" />
      <div>
        <h3 className="font-semibold text-black text-lg">Specification:</h3>
        <div>
          {data.Autopart_Model.map((model) => (
            <div key={model.Model.id} className="flex flex-row items-center gap-x-2">
              <h3 className="font-semibold text-black text-lg">Model:</h3>
              <div className="text-lg text-black">
              {model.Model.make} {model.Model.name} ({model.Model.year})
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
          <HomeButton className="flex items-center gap-x-2">
           Add to Cart
           <ShoppingCart size={20} />
          </HomeButton>
      </div>
    </div>
  );
};

export default Info;
