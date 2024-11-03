"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"

import { CategoriesColumn, columns } from "./CategoriesColumn"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/lib/authApi"
import { DataTable } from "@/components/ui/data-table"


const CategoriesClient = () => {
    const router = useRouter()
    const { data, isPending } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    })

    const formatedCategories: CategoriesColumn[] = data?.data?.map((category: { id: string; name: string; description: string; code: string; billboard_id: string }) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        code: category.code,
        billboard_id: category.billboard_id,
    })) || []

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Category${formatedCategories.length <= 1 ? '' : 's'} (${formatedCategories.length})`}
                    description="Manage category preferences"
                />
                <Button
                    onClick={() => {
                        router.push("/admin/categories/new")
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={formatedCategories} searchKey="name"/>
        </>
    )
}

export default CategoriesClient