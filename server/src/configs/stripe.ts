import Stripe from "stripe";
import appAssert from "../utils/appAssert";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
appAssert(stripeSecretKey, 500, "Stripe secret key not found");

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-11-20.acacia",
});

export default stripe;