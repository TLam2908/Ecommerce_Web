"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"

import { format } from "date-fns"
import { ProductColumn, columns } from "./ProductsColumn"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getAutoparts } from "@/lib/authApi"
import { DataTable } from "@/components/ui/data-table"

interface ProductsClientProps {
    id: string;
    name: string;
    description: string;
    price: string;
    oem_number: string;
    category: string;
    manufacturer: string;
    model: string[];
    images: string[];
}

const ProductsClient = () => {
    const router = useRouter()
    const { data, isPending } = useQuery({
        queryKey: ["products"],
        queryFn: () => getAutoparts(),
    })

    console.log(data)

    const formatedProducts: ProductColumn[] = data?.data?.map((product: ProductsClientProps) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        oem_number: product.oem_number,
        category: product.category,
        manufacturer: product.manufacturer,
        model: product.model,
        images: product.images,
    })) || []

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Product${formatedProducts.length <= 1 ? '' : 's'} (${formatedProducts.length})`}
                    description="Manage product preferences"
                />
                <Button
                    onClick={() => {
                        router.push("/admin/products/new")
                    }}
                >
                    <Plus size={24} />
                    Add Product
                </Button>
            </div>
            <Separator className="my-8" />
            <DataTable columns={columns} data={formatedProducts} searchKey="name"/>
        </>
    )
}

export default ProductsClient