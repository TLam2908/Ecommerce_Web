"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import CellAction from "@/components/admin/manufacturers/ManufacturersAction"

export type ManufacturersColumn = {
    id: string,
    name: string,
    country: string,
    type_of_product: string,
    abbrievation: string,
}

export const columns: ColumnDef<ManufacturersColumn>[] = [
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
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'country',
        header: 'Country',
    },
    {
        accessorKey: 'type_of_product',
        header: 'Type of Product',
    },
    {
        accessorKey: 'abbrievation',
        header: 'Abbrievation',
    },
    {
        id: "Action",
        cell: ({row}) => <CellAction data={row.original}/>,
    }
]