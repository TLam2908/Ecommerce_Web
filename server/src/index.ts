import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT, NODE_ENV, APP_ORIGIN } from "./constants/env";
import { OK } from "./constants/http";
import errorHandler from "./middleware/errorHandler";
import authenticate from "./middleware/authenticate";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import billboardRoutes from "./routes/billboard.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/auth", authRoutes)

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);
app.use("/billboards", authenticate, billboardRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
});
