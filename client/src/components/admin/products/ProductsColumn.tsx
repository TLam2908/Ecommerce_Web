"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./ProductsAction";
import Slider from "react-slick";

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: string;
  oem_number: string;
  category: string;
  manufacturer: string;
  quantity: string;
  models: string[];
  images: string[];
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "oem_number",
    header: "OEM Number",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
  },
  {
    accessorKey: "model",
    header: "Models",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          {row.original.models?.map((m, index) => (
            <span key={index}>{m}</span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <div className="w-[220px] h-[180px]">
          <Slider {...settings}>
            {row.original.images?.map((image, index) => (
              <div key={index} className="relative w-full h-full border border-black">
                <Image
                  src={image}
                  alt="Product Image"
                  width={200}
                  height={200}
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
      );
    },
  },
  { 
    header: "Action",
    id: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
