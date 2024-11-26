"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "./IconButton";
import Currency from "../ui/currency";
import useCart from "@/hook/useCart";
import {Product as ProductType} from "../../../types";

interface CartItemProps {
  data: ProductType;
  userQuantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ data, userQuantity }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onIncrease = () => {
    cart.increaseQuantity(data.id);
  };

  const onDecrease = () => {
    cart.decreaseQuantity(data.id);
  };

  return (
    <li className="flex py-8 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.Images[0].src}
          alt="Cart item"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} color="black" />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-xl font-semibold text-black">
              {data.name}
            </p>
          </div>

          <div className="mt-1 flex text-md">
            <p>{data.Category.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4">
              {data.Manufacturer.name}
            </p>
          </div>
          <div className="mt-2">
            <p>{data.oem_number}</p>
            <Currency value={data.price} />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <button
            onClick={onDecrease}
            className="px-2 py-1 border rounded-l-md"
          >
            -
          </button>
          <p className="px-4 py-1 border-t border-b">
            Quantity: {userQuantity}
          </p>
          <button
            onClick={onIncrease}
            className="px-2 py-1 border rounded-r-md"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
