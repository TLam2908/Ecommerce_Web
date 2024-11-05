import { Router } from "express";
import { createAutopartHandler, deleteAutopartHandler, getAutopartByIdHandler, getAutopartsHandler, updateAutopartHandler } from "../controllers/autopart.controller";

const autopartRoutes = Router();

// prefix: /autoparts

autopartRoutes.post("/", createAutopartHandler)
autopartRoutes.get("/", getAutopartsHandler)
autopartRoutes.get("/:id", getAutopartByIdHandler)
autopartRoutes.put("/:id", updateAutopartHandler)
autopartRoutes.delete("/:id", deleteAutopartHandler)

export default autopartRoutes