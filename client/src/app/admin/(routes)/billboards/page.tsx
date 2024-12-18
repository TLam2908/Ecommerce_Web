import BillboardClient from "@/components/admin/billboards/BillboardsClient";
const BillboardsPage = async () => {
  return (
    <div className="flex-col bg-white">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
