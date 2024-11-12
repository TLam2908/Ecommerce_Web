import Billboard from "@/components/main/Billboard";
import Container from "@/components/ui/container";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBillBoardById } from "@/lib/authApi";

const MainPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["billboard"],
    queryFn: () => getBillBoardById("2"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <div className="space-y-10 pb-10 bg-white">
          <Billboard />
        </div>
      </Container>
    </HydrationBoundary>
  );
};

export default MainPage;
