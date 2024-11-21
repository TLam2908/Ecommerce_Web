import CategoryBillboard from "@/components/main/CategoryBillboard";
import { Product as ProductType } from "../../../../../types";
import Container from "@/components/ui/container";
import Filter from "@/components/main/Filter";

import { getCategoryById, getManufacturers, getModels, getFilterAutoparts } from "@/lib/homeApi";
import NoResult from "@/components/main/NoResult";
import ProductCard from "@/components/main/ProductCard";
import MobileFillter from "@/components/main/MobileFilter";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    manufacturerId?: string;
    modelId?: string
    search?: string
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const manufacturers = await getManufacturers();
  const models = await getModels();  
  const category = await getCategoryById(params.categoryId);
  const filterAutoparts = await getFilterAutoparts({
    categoryId: params.categoryId,
    manufacturerId: searchParams.manufacturerId,
    modelId: searchParams.modelId,
    search: searchParams.search
  })

  const modelId = searchParams.modelId
  console.log(modelId)

  return (
    <div className="bg-white">
      <Container>
        <CategoryBillboard data={category.data.Billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFillter manuData={manufacturers.data} modelData={models.data}/>
            <div className="hidden lg:block">
              <Filter manuData={manufacturers.data} modelData={models.data}/>
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">  
              {filterAutoparts.data.length === 0 && <NoResult />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filterAutoparts.data.map((autopart: ProductType) => (
                  <ProductCard key={autopart.id} data={autopart}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
