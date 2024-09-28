import { Router } from "express";
import { registerHandler } from "../controllers/auth.controller";
import { loginHandler } from "../controllers/auth.controller";
import { logoutHandler } from "../controllers/auth.controller";
import { refreshHandler } from "../controllers/auth.controller";
import { verifyEmailHandler } from "../controllers/auth.controller";
import { sendPasswordResetHandler } from "../controllers/auth.controller";
import { resetPasswordHandler } from "../controllers/auth.controller";  

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResetHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

export default authRoutes;