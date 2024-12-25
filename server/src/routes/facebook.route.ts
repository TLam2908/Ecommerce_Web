import { Router } from "express";
import { facebookAuth, facebookAuthCallback } from "../controllers/auth.controller";

const facebookRoutes = Router();

facebookRoutes.get("/auth/facebook", facebookAuth);
facebookRoutes.get("/auth/facebook/callback", facebookAuthCallback);

export default facebookRoutes;
