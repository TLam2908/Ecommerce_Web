import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
const bodyParser = require("body-parser");

import { PORT, NODE_ENV, APP_ORIGIN } from "./constants/env";
import { OK } from "./constants/http";
import errorHandler from "./middleware/errorHandler";
import authenticate from "./middleware/authenticate";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import billboardRoutes from "./routes/billboard.route";
import manufacturerRoutes from "./routes/manufacturer.route";
import categoryRoutes from "./routes/category.route";
import modelRoutes from "./routes/model.route";
import autopartRoutes from "./routes/autopart.route";
import paymentRoutes from "./routes/payment.route";
import homeRoutes from "./routes/home.route";
import webhookRoutes from "./routes/webhook.route";
import orderRoutes from "./routes/order.route";
import statisticRoutes from "./routes/statistic.route";
import commentRoutes from "./routes/comment.route";

const app = express();

app.use("/webhook", bodyParser.raw({ type: "application/json" }), webhookRoutes);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response, next) => {
  return res.status(OK).json({ message: "Hello World" });
});
// auth routes
app.use("/home", homeRoutes);
app.use("/auth", authRoutes);
app.use("/statistics", statisticRoutes)

// protected routes
app.use("/users", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);
app.use("/billboards", authenticate, billboardRoutes);
app.use("/manufacturers", authenticate, manufacturerRoutes);
app.use("/categories", authenticate, categoryRoutes);
app.use("/models", authenticate, modelRoutes);
app.use("/autoparts", authenticate, autopartRoutes);
app.use("/payments", authenticate, paymentRoutes);
app.use("/orders", authenticate, orderRoutes);
app.use("/comments", authenticate, commentRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
});
