import catchErrors from "../utils/catchError";
import { getTotalRevenue, getTotalSales, getStock, getGraphRevenue } from "../services/payment.service";
import { OK } from "../constants/http";

export const getTotalRevenueHandler = catchErrors(async (req, res) => {
    const totalRevenue = await getTotalRevenue();
    return res.status(OK).json(totalRevenue)
    
})

export const getTotalSalesHandler = catchErrors(async (req, res) => {
    const totalSales = await getTotalSales();
    return res.status(OK).json(totalSales)
})

export const getStockHandler = catchErrors(async (req, res) => {
    const totalStock = await getStock();
    return res.status(OK).json(totalStock)
})

export const getGraphRevenueHandler = catchErrors(async (req, res) => {
    const graphRevenue = await getGraphRevenue();
    return res.status(OK).json(graphRevenue)
})