import { Router } from 'express';
import { getSessionHandler } from '../controllers/session.controller';
import { deleteSessionHandler } from '../controllers/session.controller';

const sessionRoutes = Router();

// prefix: /sessions
sessionRoutes.get("/", getSessionHandler)
sessionRoutes.delete("/:id", deleteSessionHandler)

export default sessionRoutes