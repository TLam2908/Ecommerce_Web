import { Router } from "express";
import { googleAuth, googleAuthCallback } from "../controllers/auth.controller";

const googleRoutes = Router();

googleRoutes.get("/auth/google", googleAuth);
googleRoutes.get("/auth/google/callback", googleAuthCallback);

export default googleRoutes;
