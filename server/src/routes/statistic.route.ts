import { Router } from "express";
import { getTotalRevenueHandler, getTotalSalesHandler, getStockHandler, getGraphRevenueHandler } from "../controllers/statistic.controller";

const statisticRoutes = Router();
statisticRoutes.get("/revenue", getTotalRevenueHandler);
statisticRoutes.get("/sales", getTotalSalesHandler);
statisticRoutes.get("/stock", getStockHandler);
statisticRoutes.get("/graphRevenue", getGraphRevenueHandler);

export default statisticRoutes;