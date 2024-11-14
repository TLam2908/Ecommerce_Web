import CategoryBillboard from "@/components/main/CategoryBillboard";
import { Manufacturer, Model } from "../../../../../types";

import qs from "query-string";
import Container from "@/components/ui/container";
import Filter from "@/components/main/Fillter";

import { getCategoryById, getManufacturers, getModels } from "@/lib/homeApi";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    manufacturerId?: string;
    modelId?: string | string[];
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  // const products = await getFilterAutoparts({
  //     categoryId: params.categoryId,
  //     manufacturerName: searchParams.manufacturerName,
  //     modelName: searchParams.modelName
  // })
  const manufacturers = await getManufacturers();
  const models = await getModels();  
  const category = await getCategoryById(params.categoryId);

  const modelId = searchParams.modelId
  console.log(modelId)

  return (
    <div className="bg-white">
      <Container>
        <CategoryBillboard data={category.data.Billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="hidden lg:block">
              <Filter manuData={manufacturers.data} modelData={models.data}/>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
