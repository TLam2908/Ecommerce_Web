"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CellAction from "@/components/admin/billboards/BillboardsAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  title: string;
  createdAt: string;
  image_src: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
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
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "image_src",
    header: "Image",
    cell: ({ row }) => {
      return row.original.image_src ? (
        <Image
          src={row.original.image_src}
          alt={row.original.title}
          height={50}
          width={50}
          
        />
      ) : (
        <div className="flex items-center justify-center h-[50px] w-[50px]">
          <span className="text-gray-500">No Image</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
