"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBillboards } from "@/lib/authApi";

const BillboardsClient = () => {

  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["billboards"],
    queryFn: () => getBillboards(),
  })

  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Billboards" description="Manage billboard preferences" />
        <Button onClick={() => {router.push('/admin/billboards/new')}}>
          <Plus className="mr-2 h-4 w-4"/>
          Add new
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardsClient;
