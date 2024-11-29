"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";

import { format } from "date-fns";
import { OrderColumn, columns } from "./OrdersColumn";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/authApi";
import { DataTable } from "@/components/ui/data-table";

interface OrdersClientProps {
  id: string;
  User: User;
  total: string;
  isPaid: boolean;
  createdAt: string;
}

interface User {
  name: string;
}

const OrdersClient = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  const formatedOrders: OrderColumn[] =
    data?.data?.map((order: OrdersClientProps) => ({
      id: order.id,
      customer: order.User.name,
      total: order.total,
      isPaid: order.isPaid ? "Paid" : "Unpaid",
      createdAt: format(new Date(order.createdAt), "MMMM dd, yyyy"),
    })) || [];

  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Order${formatedOrders.length <= 1 ? "" : "s"} (${
            formatedOrders.length
          })`}
          description="Manage order preferences"
        />
      </div>
      <Separator className="my-8" />
      <DataTable columns={columns} data={formatedOrders} searchKey="customer" />
    </>
  );
};

export default OrdersClient;
