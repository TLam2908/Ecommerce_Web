import { Product as ProductType } from "../../../types";
import NoResult from "./NoResult";
import ProductCard from "./ProductCard";

interface ProductListProps {
  title: string;
  data: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ title, data }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {data?.length === 0 && <NoResult />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((product: ProductType) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
