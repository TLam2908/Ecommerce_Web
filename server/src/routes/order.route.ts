import { Router } from "express";
import { getOrdersHandler, getOrderByIdHandler, deleteOrderHandler, updateOrderHandler } from "../controllers/order.controller";

const orderRoutes = Router();   
orderRoutes.get("/", getOrdersHandler);
orderRoutes.get("/:id", getOrderByIdHandler);
orderRoutes.delete("/:id", deleteOrderHandler);
orderRoutes.put("/:id", updateOrderHandler);

export default orderRoutes;