"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category } from "../../../types";
interface HomeMainNavProps {
  data: Category[];
}

const HomeMainNav: React.FC<HomeMainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const routes = data?.map((route) => ({
    href: `/main/category/${route.id}`,
    label: route.name,
    active: pathname === `/main/category/${route.id}`,
  }));
  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-black", route.active ? "text-black" : "text-neutral-500")}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default HomeMainNav;
