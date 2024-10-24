import { Router } from 'express';
import { getBillboardHandler } from '../controllers/billboard.controller';
import { createBillboardHandler } from '../controllers/billboard.controller';
import { updateBillboardHandler } from '../controllers/billboard.controller';
import { getBillboardByIdHandler } from '../controllers/billboard.controller';
import { deleteBillboardHandler } from '../controllers/billboard.controller';
const billboardRoutes = Router();

// prefix: /billboards
billboardRoutes.get("/", getBillboardHandler)
billboardRoutes.post("/", createBillboardHandler)
billboardRoutes.get("/:id", getBillboardByIdHandler)
billboardRoutes.put("/:id", updateBillboardHandler)
billboardRoutes.delete("/:id", deleteBillboardHandler)

export default billboardRoutes