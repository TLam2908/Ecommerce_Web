"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import { createPaymentStripe } from "@/lib/authApi";
import { Button } from "@/components/ui/button";
import Currency from "../ui/currency";
import useCart from "@/hook/useCart";
import useAuth from "@/hook/useAuth";

const Summary = () => {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const { items } = useCart();
    const cart = useCart();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        items?.forEach(item => {
            total += Number(item.product.price) * Number(item.quantity);
        });
        setTotal(total);
    }, [items]);

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Order placed successfully");
            cart.removeAll();
        }
        if (searchParams.get("cancelled")) {
            toast.error("Order cancelled");
        }
    }, [searchParams, cart.removeAll])

    const onCheckout = async () => {
      console.log(user)
      if (!user) {
        toast.error("User not found");
        return;
      }

      const data = {
        userData: {
          email: user.data.email,
          name: user.data.name
        },
        paymentData: {
          productIds: items.map(item => item.product.id),
          quantities: items.map(item => item.quantity)
        }
      }
      const response = await createPaymentStripe(data);
      const stripeUrl = response.data;
      window.location.href = stripeUrl;
    }

  return (
    <div className="mt-16 rounded-xl bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            Order Total:
          </div>
          <Currency value={total} />
        </div>
      </div>
      <Button className="w-full mt-6" onClick={onCheckout}>Checkout</Button>
    </div>
  );
};

export default Summary;
