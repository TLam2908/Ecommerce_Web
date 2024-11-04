"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"

import { ModelsColumn, columns } from "./ModelsColumn"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getModels } from "@/lib/authApi"
import { DataTable } from "@/components/ui/data-table"

const ModelsClient = () => {
    const router = useRouter()
    const { data, isPending } = useQuery({
        queryKey: ["models"],
        queryFn: () => getModels(),
    })

    const formatedModels: ModelsColumn[] = data?.data?.map((model: { id: string; name: string; make:string; year: string }) => ({
        id: model.id,
        name: model.name,
        make: model.make,
        year: model.year,
    })) || []

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Model${formatedModels.length <= 1 ? '' : 's'} (${formatedModels.length})`}
                    description="Manage model preferences"
                />
                <Button
                    onClick={() => {
                        router.push("/admin/models/new")
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={formatedModels} searchKey="name"/>
        </>
    )
}

export default ModelsClient