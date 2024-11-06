import ProductsClient from "@/components/admin/products/ProductsClient"
const ProductsPage = () => {
    return (
        <div className="flex-col bg-white">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient />
            </div>
        </div>
    )
}

export default ProductsPage