"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import CellAction from "@/components/admin/categories/CategoriesAction"

export type CategoriesColumn = {
    id: string,
    name: string,
    description: string,
    code: string,
    billboard_id: string,
}

export const columns: ColumnDef<CategoriesColumn>[] = [
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
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'billboard_id',
        header: 'Billboard ID',
    },
    {
        id: "Action",
        cell: ({row}) => <CellAction data={row.original}/>,
    },
]