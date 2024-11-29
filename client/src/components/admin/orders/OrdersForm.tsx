"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

import { getOrderById, updateOrder } from "@/lib/authApi";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "../../../../types";

const OrdersForm = () => {
  const router = useRouter();
  const params = useParams();

  const orderId = params.orderId[0];

  const { data } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderById(orderId),
  });

  const {
    mutate: update,
    isError,
    isPending,
  } = useMutation({
    mutationFn: updateOrder,
    onError: () => {
      toast.error("An error occurred while updating the order");
    },
    onSuccess: () => {
      router.replace("/admin/orders");
      toast.success("Order updated successfully");
    },
  });

  console.log(data?.data);

  const formatDate = data?.data.createdAt.split("T")[0];

  return (
    <>
      <div className="flex items-center justify-between p-8 pt-6">
        <Heading
          title="Detail Order"
          description="Information about autoparts and customer"
        ></Heading>
      </div>
      <Separator />
      <div>
        <div className="flex flex-col p-8">
          <div className="flex-col">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-lg tracking-tight">Order ID:</p>
              <p className="text-lg tracking-tight">{data?.data.id}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-lg tracking-tight">
                Customer Name:
              </p>
              <p className="text-lg tracking-tight">{data?.data.User.name}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-lg tracking-tight">Phone:</p>
              <p className="text-lg tracking-tight">{data?.data.phone}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-lg tracking-tight">Address:</p>
              <p className="text-lg tracking-tight">{data?.data.address}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-lg tracking-tight">Date:</p>
              <p className="text-lg tracking-tight">{formatDate}</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="p-8 pt-6">
        <h1 className="text-2xl font-semibold tracking-tighter mb-8">
          List of products
        </h1>
        <div>
          {data?.data.CartItem.map((item: CartItem) => (
            <div className="mb-8 cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/main/product/${item.Autopart.id}`)}>
              <div className="flex gap-10">
                <Image
                  src={item.Autopart.Images[0]?.src}
                  width={150}
                  height={150}
                  className=" aspect-square rounded-xl object-cover"
                  alt={item.Autopart.name}
                />
                <div>
                  <p className="tracking-tight font-semibold text-lg mb-2">
                    {item.Autopart.name}
                  </p>
                  <div className="flex flex-row items-center text-md tracking-tight">
                    <p>OEM Number:&nbsp;</p>
                    <p>{item.Autopart.oem_number}</p>
                  </div>
                  <div  className="flex flex-row items-center text-md tracking-tight">
                    <p>Price:&nbsp;</p>
                    <p>
                      ${item.Autopart.price}.00
                    </p>
                  </div>
                  <div  className="flex flex-row items-center text-md tracking-tight">
                    <p>Quantity:&nbsp;</p>
                    <p>
                      {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrdersForm;
