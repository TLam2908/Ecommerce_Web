"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./UsersAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserColumn = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  image_src: string;
  verified: string;
  createdAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "image_src",
    header: "Image",
    cell: ({ row }) => {
      return row.original.image_src ? (
        <Image
          src={row.original.image_src}
          alt={row.original.name || "No name"}
          height={50}
          width={50}
          className="rounded-full"
        />
      ) : (
        <div className="flex items-center justify-center h-[50px] w-[50px]">
          <span className="text-gray-500">No Image</span>
        </div>
      );
    },
  },
  {
    accessorKey: "verified",
    header: "Verified",
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
