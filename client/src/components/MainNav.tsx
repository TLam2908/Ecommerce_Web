"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const params = useParams();
  const pathName = usePathname();

  const routes = [
    {
      href: "/admin",
      label: "Overview",
      active: pathName === "/admin",
    },
    {
      href: "/admin/billboards",
      label: "Billboards",
      active: pathName === "/admin/billboards",
    },
    {
      href: "/admin/users",
      label: "Users",
      active: pathName === "/admin/users",
    },
    {
      href: "/admin/categories",
      label: "Categories",
      active: pathName === "/admin/categories",
    },
    {
      href: "/admin/products",
      label: "Products",
      active: pathName === "/admin/products",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      active: pathName === "/admin/orders",
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.label}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
