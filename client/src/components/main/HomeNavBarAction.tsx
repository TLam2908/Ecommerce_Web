"use client";
import { ShoppingBag } from "lucide-react";

import HomeButton from "@/components/main/HomeButton";
import { useState, useEffect } from "react";
const HomeNavBarAction = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <HomeButton className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">0</span>
      </HomeButton>
    </div>
  );
};

export default HomeNavBarAction;
