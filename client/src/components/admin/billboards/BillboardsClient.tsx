"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";

import { format } from "date-fns";
import { BillboardColumn, columns } from "./BillboardsColumn";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBillboards } from "@/lib/authApi";
import { DataTable } from "@/components/ui/data-table";

const BillboardsClient = () => {
  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["billboards"],
    queryFn: () => getBillboards(),
  });

  const formatedBillboards: BillboardColumn[] = data?.data?.map((billboard: { id: string; title: string; createdAt: string }) => ({
    id: billboard.id,
    title: billboard.title,
    createdAt: format(new Date(billboard.createdAt), "MMMM dd, yyyy"),
  })) || []

  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard${formatedBillboards.length <= 1 ? '' : 's'} (${formatedBillboards.length})`}
          description="Manage billboard preferences"
        />
        <Button
          onClick={() => {
            router.push("/admin/billboards/new");
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formatedBillboards} searchKey="title"/>
    </>
  );
};

export default BillboardsClient;
