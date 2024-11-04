import { Router } from "express";
import { createManufacturerHandler } from "../controllers/manufacturer.controller";
import { deleteManufacturerHandler } from "../controllers/manufacturer.controller";
import { getManufacturerByIdHandler } from "../controllers/manufacturer.controller";
import { getManufacturersHandler } from "../controllers/manufacturer.controller";
import { updateManufacturerHandler } from "../controllers/manufacturer.controller";
const manufacturerRoutes = Router();

// prefix: /manufacturers
manufacturerRoutes.get("/", getManufacturersHandler);
manufacturerRoutes.post("/", createManufacturerHandler);
manufacturerRoutes.get("/:id", getManufacturerByIdHandler);
manufacturerRoutes.put("/:id", updateManufacturerHandler);
manufacturerRoutes.delete("/:id", deleteManufacturerHandler);

export default manufacturerRoutes;