"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"

import { ManufacturersColumn, columns } from "./ManufacturersColumn"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getManufacturers } from "@/lib/authApi"
import { DataTable } from "@/components/ui/data-table"


const ManufacturersClient = () => {
    const router = useRouter()
    const { data, isPending } = useQuery({
        queryKey: ["manufacturers"],
        queryFn: () => getManufacturers(),
    })

    const formatedManufactuers: ManufacturersColumn[] = data?.data?.map((manufacturer: {id: string; name: string; country: string, type_of_product: string, abbreviation: string}) => ({
        id: manufacturer.id,
        name: manufacturer.name,
        country: manufacturer.country,
        type_of_product: manufacturer.type_of_product,
        abbreviation: manufacturer.abbreviation, 
    })) || []

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Manufacturer${formatedManufactuers.length <= 1 ? '' : 's'} (${formatedManufactuers.length})`}
                    description="Manage manufacturer preferences"
                />
                <Button
                    onClick={() => {
                        router.push("/admin/manufacturers/new")
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={formatedManufactuers} searchKey="name"/>
        </>
    )
}

export default ManufacturersClient