"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./ProductsAction";

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: string;
  oem_number: string;
  category: string;
  manufacturer: string;
  model: string[];
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          {row.original.model.map((m, index) => (
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
      return (
        <div className="flex items-center">
          {row.original.images.map((image, index) => (
            <div key={index} className="w-10 h-10 relative mr-2">
              <Image
                src={image}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
