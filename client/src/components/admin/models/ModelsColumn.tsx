"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

import CellAction from "@/components/admin/models/ModelsAction"
export type ModelsColumn = {
    id: string,
    name: string,
    make: string,
    year: string,
}

export const columns: ColumnDef<ModelsColumn>[] = [
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
        accessorKey: 'make',
        header: 'Make',
    },
    {
        accessorKey: 'year',
        header: 'Year',
    },
    {
        id: "Action",
        cell: ({row}) => <CellAction data={row.original}/>,
    }
]