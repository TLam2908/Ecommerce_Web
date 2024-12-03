import Stripe from "stripe";
import stripe from "../configs/stripe";
import appAssert from "../utils/appAssert";
import { PrismaClient } from "@prisma/client";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http";
import { APP_ORIGIN } from "../constants/env";

const prisma = new PrismaClient();

type CreatePaymentStripeParams = {
  userData: {
    email: string;
    name: string;
  };
  paymentData: {
    productIds: string[];
    quantities: number[];
  };
};

export const createPaymentStripe = async (
  userData: CreatePaymentStripeParams["userData"],
  paymentData: CreatePaymentStripeParams["paymentData"]
) => {
  const productIds = paymentData.productIds;

  const products = await prisma.autopart.findMany({
    where: {
      id: {
        in: productIds.map((id) => parseInt(id)),
      },
    },
    include: {
      Images: true,
    },
  });

  appAssert(products, NOT_FOUND, "Products not found");

  let total = 0;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((product, index) => {
    const productQuantity = paymentData.quantities[index];
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: product.Images.map((image) => image.src),
        },
        unit_amount: product.price * 100,
      },
      quantity: productQuantity,
    });
    total += product.price * productQuantity;
  });

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  appAssert(user, NOT_FOUND, "User not found");

  const cart = await prisma.cart.create({
    data: {
      user_id: user.id,
      total: total,
      isPaid: false,
      CartItem: {
        create: products.map((product, index) => ({
          quantity: paymentData.quantities[index],
          autopart_id: product.id,
        })),
      },
    },
  });

  appAssert(cart, NOT_FOUND, "Cart creation failed");

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${APP_ORIGIN}/main/cart?success=1`,
    cancel_url: `${APP_ORIGIN}/main/cart?cancel=1`,
    metadata: {
      cartId: cart.id,
    },
  });

  appAssert(session, INTERNAL_SERVER_ERROR, "Session creation failed");
  return session.url;
};

export const successPaymentStripe = async (body: any, signature: any) => {
  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    appAssert(
      webhookSecret,
      INTERNAL_SERVER_ERROR,
      "Stripe webhook secret not configured"
    );
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    throw new Error(`Webhook Error: ${err.message}`);
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");
  if (event.type === "checkout.session.completed") {
    const cart = await prisma.cart.update({
      where: {
        id: session?.metadata?.cartId
          ? parseInt(session?.metadata?.cartId)
          : undefined,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session.customer_details?.phone || "",
      },
      include: {
        CartItem: true,
      },
    });

    appAssert(cart, NOT_FOUND, "Cart not found");
    const updateProducts = cart.CartItem.map(async (item) => {
      const updatedQuantity = item.quantity;
      await prisma.autopart.update({
        where: {
          id: item.autopart_id,
        },
        data: {
          quantity: {
            decrement: updatedQuantity,
          },
        },
      });
    });
    await Promise.all(updateProducts);
  }

  return true;
};

export const getTotalRevenue = async () => {
  const carts = await prisma.cart.findMany({
    where: {
      isPaid: true,
    },
  });

  appAssert(carts, NOT_FOUND, "Carts not found");

  const total = carts.reduce((acc, cart) => acc + cart.total, 0);
  return total;
};

export const getTotalSales = async () => {
  const count = await prisma.cart.count({
    where: {
      isPaid: true,
    },
  });

  appAssert(count, NOT_FOUND, "Nothing to count");
  return count;
};

export const getStock = async () => {
  const stock = await prisma.autopart.findMany({
    where: {
      quantity: {
        gt: 0,
      },
    },
  });

  appAssert(stock, NOT_FOUND, "Stock not found");
  const totalStock = stock.reduce((acc, product) => acc + product.quantity, 0);
  return totalStock;
};

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async () => {
  const paidOrders = await prisma.cart.findMany({
    where: {
      isPaid: true,
    },
    include: {
      CartItem: {
        include: {
          Autopart: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};
  for (const cart of paidOrders) {
    const month = cart.createdAt.getMonth();
    let revenue = 0;

    for (const item of cart.CartItem) {
      revenue += item.Autopart.price * item.quantity;
    }
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenue;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
  }

  return graphData
};
