import { getRelatedAutoparts, getAutopartById } from "@/lib/homeApi";
import Container from "@/components/ui/container";
import Gallery from "@/components/main/gallery";
import Info from "@/components/main/Info";
import Comments from "@/components/main/Comments";
import { Separator } from "@/components/ui/separator";
import ProductList from "@/components/main/ProductList";
import { Product as ProductType } from "../../../../../types";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getAutopartById(params.productId);
  // console.log("data1: ", product.data.Images);
  const relatedAutoparts = await getRelatedAutoparts(params.productId);
  const filterRelatedAutoparts = relatedAutoparts.data.filter(
    (autopart: ProductType) => autopart.id.toString() !== params.productId
  );

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.data.Images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product.data} />
              <Separator className="my-10" />
              <Comments />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList
            title="Related Autoparts"
            data={filterRelatedAutoparts}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
