import { Router } from "express";
import { checkoutStripeHandler } from "../controllers/payment.controller";

const paymentRoutes = Router();
paymentRoutes.post("/checkout", checkoutStripeHandler);
export default paymentRoutes;