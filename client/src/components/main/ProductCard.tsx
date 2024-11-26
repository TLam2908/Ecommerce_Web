"use client"

import { Product as ProductType } from "../../../types";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

import usePreviewModal from "@/hook/usePreviewModal";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./IconButton";
import Image from "next/image";
import Currency from "../ui/currency";
import useCart from "@/hook/useCart";

interface ProductCardProps {
  data: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const previewModal = usePreviewModal();
  const handleClick = () => {
    router.push(`/main/product/${data.id}`);
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    cart.addItem(data, 1)
  } 

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.Images[0]?.src}
          fill
          alt={data.name}
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">
          {data.name}
        </p>
        <p>
          {data.Category.name}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
        
      </div>
    </div>
  );
};

export default ProductCard;
