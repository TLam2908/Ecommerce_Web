import { Router } from 'express';
import { createUserHandler, deleteUserHandler, getUserByIdHandler, getUsersHandler, updateUserHandler, currentUserHandler } from '../controllers/user.controller';

const userRoutes = Router();

// prefix: /users

userRoutes.post("/", createUserHandler)
userRoutes.get("/me", currentUserHandler)
userRoutes.get("/", getUsersHandler)
userRoutes.get("/:id", getUserByIdHandler)
userRoutes.put("/:id", updateUserHandler)
userRoutes.delete("/:id", deleteUserHandler)


export default userRoutes