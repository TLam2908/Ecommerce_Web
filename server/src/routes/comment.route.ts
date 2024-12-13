import { Router } from "express";
import { getCommentsHandlerByAutoPart, addCommentHandler, editCommentHandler, deleteCommentHandler, getCommentHandlerById } from "../controllers/comment.controller";
const commentRoutes = Router();

// prefix: /comments
commentRoutes.get("/autopart/:id", getCommentsHandlerByAutoPart);
commentRoutes.get("/:id", getCommentHandlerById);
commentRoutes.post("/", addCommentHandler);
commentRoutes.put("/:id", editCommentHandler);
commentRoutes.delete("/:id", deleteCommentHandler);

export default commentRoutes;