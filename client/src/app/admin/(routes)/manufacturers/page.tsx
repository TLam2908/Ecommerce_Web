import ManufacturersClient from "@/components/admin/manufacturers/ManufacturersClient";

const ManufacturersPage = () => {
    return (
        <div className="flex-col bg-white">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ManufacturersClient />
            </div>
        </div>
    )
}  

export default ManufacturersPage