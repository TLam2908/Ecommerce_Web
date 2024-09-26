import { Router } from "express";
import { registerHandler } from "../controllers/auth.controller";
import { loginHandler } from "../controllers/auth.controller";
import { logoutHandler } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);

export default authRoutes;