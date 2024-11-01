import { Router } from 'express';
import { createCategoryHandler } from '../controllers/category.controller';
import { deleteCategoryHandler } from '../controllers/category.controller';
import { getCategoryByIdHandler } from '../controllers/category.controller';
import { getCategoriesHandler } from '../controllers/category.controller';
import { updateCategoryHandler } from '../controllers/category.controller';
const categoryRoutes = Router();

// prefix: /categories
categoryRoutes.get("/", getCategoriesHandler)
categoryRoutes.post("/", createCategoryHandler)
categoryRoutes.get("/:id", getCategoryByIdHandler)
categoryRoutes.put("/:id", updateCategoryHandler)
categoryRoutes.delete("/:id", deleteCategoryHandler)

export default categoryRoutes
