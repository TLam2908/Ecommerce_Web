"use client";
import { ShoppingBag } from "lucide-react";

import HomeButton from "@/components/main/HomeButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useCart from "@/hook/useCart";
const HomeNavBarAction = () => {
  const cart = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <HomeButton onClick={() => router.push("/main/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>
      </HomeButton>
    </div>
  );
};

export default HomeNavBarAction;
