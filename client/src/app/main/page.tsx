import Billboard from "@/components/main/Billboard";
import Container from "@/components/ui/container";
import ProductList from "@/components/main/ProductList";

import { getAutoparts, getBillboards} from "@/lib/homeApi";

const MainPage = async () => {
    const billboards = await getBillboards();
    const products = await getAutoparts();
  
  return (
    <Container>
      <div className="space-y-10 pb-10 bg-white">
        <Billboard data={billboards.data}/>
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 bg-white">
        <ProductList title="Featured products" data={products.data}/>
      </div>
    </Container>
  );
};

export default MainPage;
