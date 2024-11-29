import OrdersClient from "@/components/admin/orders/OrdersClient";

const OrdersPage = () => {
    return (
        <div className="flex-col bg-white">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrdersClient />
            </div>
        </div>
    )
}

export default OrdersPage