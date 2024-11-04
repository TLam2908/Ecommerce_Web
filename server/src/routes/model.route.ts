import { Router } from "express";
import { createModelHandler } from "../controllers/model.controller";
import { deleteModelHandler } from "../controllers/model.controller";
import { getModelByIdHandler } from "../controllers/model.controller";
import { getModelsHandler } from "../controllers/model.controller";
import { updateModelHandler } from "../controllers/model.controller";
const modelRoutes = Router();

// prefix: /models
modelRoutes.get("/", getModelsHandler);
modelRoutes.post("/", createModelHandler);
modelRoutes.get("/:id", getModelByIdHandler);
modelRoutes.put("/:id", updateModelHandler);
modelRoutes.delete("/:id", deleteModelHandler);

export default modelRoutes;