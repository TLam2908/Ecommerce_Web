import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchError";
import { NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from "../constants/http";
import { orderSchema } from "../validation/order.validation";

const prisma = new PrismaClient();

export const getOrdersHandler = catchErrors(async (req, res) => {
    const orders = await prisma.cart.findMany({
        include: {
            User: true,
        }
    });
    appAssert(orders, NOT_FOUND, "Orders not found");

    return res.status(OK).json({
        data: orders,
    });
})

export const getOrderByIdHandler = catchErrors(async (req, res) => {
    const { id } = req.params;

    const order = await prisma.cart.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            User: true,
            CartItem: {
                include: {
                    Autopart: {
                        include: {
                            Images: true,
                        }
                    }
                }
            }
        },
    });
    appAssert(order, NOT_FOUND, "Order not found");

    return res.status(OK).json({
        data: order
    });
})

export const getOrderByUserId = catchErrors(async (req, res) => {
    const { userId } = req.params;
    const orders = await prisma.cart.findMany({
        where: {
            user_id: parseInt(userId),
        },
    })
    appAssert(orders, NOT_FOUND, "Orders not found");
    return res.status(OK).json({
        data: orders,
    })
})

export const deleteOrderHandler = catchErrors(async (req, res) => {
    const { id } = req.params;

    const order = await prisma.cart.delete({
        where: {
            id: parseInt(id),
        },
    });
    appAssert(order, NOT_FOUND, "Order not found");

    return res.status(OK).json({
        data: order,
    });
})

export const updateOrderHandler = catchErrors(async (req, res) => {
    const { id } = req.params;
    const request = orderSchema.parse(req.body);
    const order = await prisma.cart.update({
        where: {
            id: parseInt(id),
        },
        data: {
            phone: request.phone,
            address: request.address,
        }
    })

    appAssert(order, UNPROCESSABLE_CONTENT, "Order update failed");

    return res.status(OK).json({
        data: order,
    });
})