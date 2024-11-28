import { Router } from "express";
import { successStripeHandler } from "../controllers/payment.controller";

const webhookRoutes = Router();
webhookRoutes.post("/", successStripeHandler);

export default webhookRoutes;